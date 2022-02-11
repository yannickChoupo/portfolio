const router = require('express').Router();
const todoController = require('../../controllers/todo');
const auth = require("../../middleware/auth");

router.get('/', (req, res) => {
    return res.send("todo manage");
})
router.get('/api/getTodos', todoController.getTodos);
router.get('/api/getTodo', todoController.getTodo);
router.post('/api/storeTodo', todoController.storeTodo);
router.post('/api/updateTodo', todoController.updateTodos);
router.post('/api/removeTodo', todoController.removeTodo);

module.exports = router;