import { Router } from 'express';
import {
  deleteTask,
  index,
  pageAdd,
  pageEdit,
  save,
  update,
} from '../controllers/tasksController.js';
import taskValidators from '../validators/tasks.js';

const router = new Router();

router.get('/', index);
router.get('/add', pageAdd);
router.get('/edit/:taskId', pageEdit);
router.post('/add', taskValidators, save);
router.post('/update', taskValidators, update);
router.delete('/delete/:taskId', deleteTask);

export default router;
