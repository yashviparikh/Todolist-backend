const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const Task = require('./models/Todo');

const app = express(); // Created instance of the express app
app.use(bodyParser.json()); // Converts incoming JSON payloads into JS objects
app.use(cors());
app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/todolist')
  .then(() => console.log('Connected to mongodb'))
  .catch((err) => console.log(err));

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Todo API! Use /tasks to interact with tasks.');
});

// Get All Tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks from MongoDB
    res.json(tasks); // Send tasks as JSON response
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Add New Task
app.post('/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: 'Error creating the task' });
  }
});

// Update a Task
app.put('/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: 'Error updating task' });
  }
});

// Delete a Task
app.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
