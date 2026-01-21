import { Router } from 'express';
const router = Router();
import Task from '../models/Task.js';
import authMiddleware from '../middleware/authMiddleware.js';

// Apply authentication middleware to all routes in this router
router.use(authMiddleware);

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private

router.post('/', async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    // Validation: Title is required
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // Create the new task
    const newTask = new Task({
      title,
      description,
      priority, 
      status,  
      dueDate,
      userId: req.user.userId 
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/tasks
// @desc    Get all tasks for logged-in user (with Filter & Sort)
// @access  Private

router.get('/', async (req, res) => {
  try {
    const { status, priority, sortBy } = req.query;

    // 1. Handle Filtering
    let query = { userId: req.user.userId };

    // Apply filters if provided
    if (status) {
      query.status = status;
    }
    if (priority) {
      query.priority = priority;
    }

    // 2. Handle Sorting
    // Default sort is by creation date (newest first)
    let sortOptions = { createdAt: -1 }; 

    if (sortBy === 'date') {
      sortOptions = { dueDate: 1 }; // Ascending order (soonest due first)
    } else if (sortBy === 'priority') {
        // Ascending order (highest priority first)
        sortOptions = { priority: 1 }; 
    }

    // Execute the query
    const tasks = await Task.find(query).sort(sortOptions);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private

router.put('/:id', async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    // Find task by ID and verify it belongs to the logged-in user
    let task = await Task.findOne({ _id: req.params.id, userId: req.user.userId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update fields
    if (title) task.title = title;
    if (description) task.description = description;
    if (priority) task.priority = priority;
    if (status) task.status = status;
    if (dueDate) task.dueDate = dueDate;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private

router.delete('/:id', async (req, res) => {
  try {
    // Find and delete the task in one step, ensuring it belongs to the user
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;