import { Router, Request, Response } from 'express';
import { getTodo, getTodos, removeTodo, storeTodo, updateTodos } from './todo.controller';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    return res.send("todo manage");
})
router.get('/getTodos', getTodos);
router.get('/getTodo', getTodo);
router.post('/storeTodo', storeTodo);
router.post('/updateTodo', updateTodos);
router.post('/removeTodo', removeTodo);

export default router;
