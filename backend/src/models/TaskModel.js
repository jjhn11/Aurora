const pool = require('../config/db');

const getAllTasks = () => pool.query('SELECT * FROM tasks');

const getTaskById = (id) =>
  pool.query('SELECT * FROM tasks WHERE id = ?', [id]);

const createTask = (name, description, completed) =>
  pool.query('INSERT INTO tasks (name, description, completed) VALUES (?, ?, ?)', [name, description, completed]);

const updateTask = (id, name, description, completed) =>
  pool.query('UPDATE tasks SET name = ?, description = ?, completed = ? WHERE id = ?', [name, description, completed, id]);

const deleteTask = (id) =>
  pool.query('DELETE FROM tasks WHERE id = ?', [id]);

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
