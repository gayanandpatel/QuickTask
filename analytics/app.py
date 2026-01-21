from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from bson import ObjectId

# 1. Flask App Setup
load_dotenv()

app = Flask(__name__)
CORS(app) # Allow cross-origin requests (crucial for React)

# 2. Database Connection
# We connect to the SAME database as the Node backend
client = MongoClient(os.getenv("MONGO_URI"))
db = client.get_database()
tasks_collection = db.tasks

@app.route('/', methods=['GET'])
def home():
    return "Analytics Service is Running..."

# Endpoint 1: User Task Statistics
# GET /api/stats/user?userId=12345
@app.route('/api/stats/user', methods=['GET'])
def get_user_stats():
    user_id = request.args.get('userId')

    if not user_id:
        return jsonify({"error": "userId is required"}), 400

    try:
        # filter by userId
        query = {"userId": ObjectId(user_id)}
        
        # Count totals
        total_tasks = tasks_collection.count_documents(query)
        completed_tasks = tasks_collection.count_documents({**query, "status": "Completed"})
        pending_tasks = total_tasks - completed_tasks

        return jsonify({
            "totalTasks": total_tasks,
            "completedTasks": completed_tasks,
            "pendingTasks": pending_tasks,
            "completionRate": round((completed_tasks / total_tasks * 100), 2) if total_tasks > 0 else 0
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint 2: Productivity Trend (Last 7 Days)
# GET /api/stats/productivity?userId=12345
@app.route('/api/stats/productivity', methods=['GET'])
def get_productivity_stats():
    user_id = request.args.get('userId')

    if not user_id:
        return jsonify({"error": "userId is required"}), 400

    try:
        # Calculate date 7 days ago
        seven_days_ago = datetime.utcnow() - timedelta(days=7)

        # Pipeline to group completed tasks by date
        pipeline = [
            {
                "$match": {
                    "userId": ObjectId(user_id),
                    "status": "Completed",
                    "createdAt": {"$gte": seven_days_ago} # Using createdAt as proxy for completion time
                }
            },
            {
                "$group": {
                    "_id": { "$dateToString": { "format": "%Y-%m-%d", "date": "$createdAt" } },
                    "count": { "$sum": 1 }
                }
            },
            { "$sort": { "_id": 1 } } # Sort by date ascending
        ]

        data = list(tasks_collection.aggregate(pipeline))
        
        # Format for frontend (Recharts usually likes simple arrays)
        formatted_data = [{"date": item["_id"], "completed": item["count"]} for item in data]

        return jsonify(formatted_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Run on a different port (5001) to avoid conflict with Node (5000)
    app.run(debug=True, port=int(os.getenv("PORT", 5001)))