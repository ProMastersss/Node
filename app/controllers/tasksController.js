import { validationResult } from 'express-validator';
import helpers from '../helpers/tasks.js';
import Task from '../models/task.js';

const index = async (req, res) => {
  const tasks = await Task.find({ user: req.user });

  res.render('pages/tasks/tasks', {
    title: 'Задачи',
    isTasks: true,
    tasks,
    helpers,
  });
};

const pageAdd = (req, res) => {
  res.render('pages/tasks/editTask', {
    title: 'Добавить задачу',
    isAdd: true,
    helpers,
  });
};

const pageEdit = async (req, res) => {
  const task = await Task.findById(req.params.taskId);

  res.render('pages/tasks/editTask', {
    title: 'Редактировать задачу',
    task,
    helpers,
  });
};

const save = async (req, res) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('pages/tasks/editTask', {
      title: 'Добавить задачу',
      isAdd: true,
      task: req.body,
      error: errors.array()[0].msg,
      helpers,
    });
  }

  const { name, description, count, complexity, completed } = req.body;
  const task = new Task({
    name,
    description,
    count,
    complexity,
    completed: completed ?? false,
    user: req.user,
  });

  task.save();
  res.redirect('/tasks');
};

const update = async (req, res) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('pages/tasks/editTask', {
      title: 'Редактировать задачу',
      task: req.body,
      error: errors.array()[0].msg,
      helpers,
    });
  }

  const { taskId } = req.body;
  await Task.findByIdAndUpdate(taskId, {
    ...req.body,
    id: undefined,
  });

  res.redirect('/tasks');
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  await Task.deleteOne({ _id: taskId });
  res.send('Ok');
};

export { index, pageAdd, pageEdit, save, update, deleteTask };
