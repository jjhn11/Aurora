const express = require('express');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../models/TaskModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await getAllTasks();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, description, completed } = req.body;
    const [result] = await createTask(name, description, completed);
    const [rows] = await getTaskById(result.insertId);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, description, completed } = req.body;
    const [result] = await updateTask(req.params.id, name, description, completed);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found' });
    const [rows] = await getTaskById(req.params.id);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const [result] = await deleteTask(req.params.id);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
