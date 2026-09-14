const Task = require('../models/Task');
const Project = require('../models/Project');

// GET /api/tasks?project=<id>&status=<status>
const getTasks = async (req, res, next) => {
  try {
    const filter = { owner: req.user._id };
    if (req.query.project) filter.project = req.query.project;
    if (req.query.status) filter.status = req.query.status;

    const tasks = await Task.find(filter).populate('project', 'name').sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description, project, status, priority, dueDate } = req.body;

    if (!title || !project) {
      return res.status(400).json({ message: 'El titulo y el proyecto son obligatorios' });
    }

    const projectExists = await Project.findOne({ _id: project, owner: req.user._id });
    if (!projectExists) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    const task = await Task.create({
      title,
      description,
      project,
      status,
      priority,
      dueDate,
      owner: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id }).populate(
      'project',
      'name'
    );
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks, createTask, getTaskById, updateTask, deleteTask };
