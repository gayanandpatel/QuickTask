from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from bson import ObjectId

# 1. Load Environment Variables
load_dotenv()

app = Flask(__name__)
# CORS(app)

# Update CORS
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "https://quick-task-delta.vercel.app"]}})

# 2. Database Connection
mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)

try:
    db = client.get_database()
except:
    db = client['prepnec_db']

tasks_collection = db.tasks

@app.route('/', methods=['GET'])
def home():
    return "Analytics Service is Running..."

# ==========================================
# ENDPOINT 1: User Stats (Totals & Pie Chart Data)
# ==========================================
@app.route('/api/stats/user', methods=['GET'])
def get_user_stats():
    user_id = request.args.get('userId')

    if not user_id:
        return jsonify({"error": "userId is required"}), 400

    try:
        query = {"userId": ObjectId(user_id)}
        
        # Basic Counts
        total_tasks = tasks_collection.count_documents(query)
        completed_tasks = tasks_collection.count_documents({**query, "status": "Completed"})
        pending_tasks = total_tasks - completed_tasks

        # Priority Counts (For Pie Chart)
        high_priority = tasks_collection.count_documents({**query, "priority": "High"})
        medium_priority = tasks_collection.count_documents({**query, "priority": "Medium"})
        low_priority = tasks_collection.count_documents({**query, "priority": "Low"})

        completion_rate = 0
        if total_tasks > 0:
            completion_rate = round((completed_tasks / total_tasks * 100), 2)

        return jsonify({
            "totalTasks": total_tasks,
            "completedTasks": completed_tasks,
            "pendingTasks": pending_tasks,
            "completionRate": completion_rate,
            "byPriority": {
                "High": high_priority,
                "Medium": medium_priority,
                "Low": low_priority
            }
        })
    except Exception as e:
        print(f"Error in user stats: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

# ==========================================
# ENDPOINT 2: Stacked Bar Chart Data (Last 7 Days)
# ==========================================
@app.route('/api/stats/productivity', methods=['GET'])
def get_productivity_stats():
    user_id = request.args.get('userId')

    if not user_id:
        return jsonify({"error": "userId is required"}), 400

    try:
        # 1. Calculate the date 7 days ago
        seven_days_ago = datetime.utcnow() - timedelta(days=6) # 6 days ago + today = 7 days

        # 2. Aggregation Pipeline
        # We match ALL tasks from last 7 days (not just completed)
        pipeline = [
            {
                "$match": {
                    "userId": ObjectId(user_id),
                    "createdAt": {"$gte": seven_days_ago}
                }
            },
            {
                "$group": {
                    "_id": { 
                        "date": { "$dateToString": { "format": "%Y-%m-%d", "date": "$createdAt" } },
                        "status": "$status"
                    },
                    "count": { "$sum": 1 }
                }
            }
        ]

        raw_data = list(tasks_collection.aggregate(pipeline))

        # 3. Restructure Data for Stacked Bar Chart
        # Goal: [{"date": "2023-10-01", "Todo": 2, "In Progress": 1, "Completed": 5}, ...]
        
        # Initialize a dictionary for the last 7 days with 0 counts
        stats_by_date = {}
        for i in range(7):
            d = (datetime.utcnow() - timedelta(days=i)).strftime("%Y-%m-%d")
            stats_by_date[d] = {
                "date": d, 
                "Todo": 0, 
                "In Progress": 0, 
                "Completed": 0
            }

        # Fill in the actual data from MongoDB
        for item in raw_data:
            date_str = item['_id']['date']
            status = item['_id']['status']
            count = item['count']
            
            # Only update if the date is within our 7-day window
            if date_str in stats_by_date:
                stats_by_date[date_str][status] = count

        # Convert to list and sort by date
        final_data = sorted(stats_by_date.values(), key=lambda x: x['date'])

        return jsonify(final_data)
    except Exception as e:
        print(f"Error in productivity stats: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

#for local development
# if __name__ == '__main__':
#     port = int(os.getenv("PORT", 5001))
#     app.run(debug=True, port=port)

#for production deployment
# Vercel requires the 'app' object to be available globally.
# We don't need to change anything else, just ensure app.run is inside the if block.
if __name__ == '__main__':
    port = int(os.getenv("PORT", 5001))
    app.run(debug=True, port=port)