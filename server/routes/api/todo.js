const router = require('express').Router();
const todoController = require('../../controllers/todo');
const auth = require("../../middleware/auth");

router.get('/', (req, res) => {
    return res.send("todo manage");
})
router.get('/getTodos', todoController.getTodos);
router.get('/getTodo', todoController.getTodo);
router.post('/storeTodo', todoController.storeTodo);
router.post('/updateTodo', todoController.updateTodos);
router.post('/removeTodo', todoController.removeTodo);

module.exports = router;