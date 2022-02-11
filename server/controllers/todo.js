// const res = require('express/lib/response');
const Todo = require('../models/todo');

async function getTodo() {
    try {
        // Authenticate userName
        const todos = await Todo.find();

        if (!todos) {
            return res.send({
                success: false,
                message: 'Error: no todo added jet'
            });
        }
        console.log("exiting todos : ", todos)
        // Send back all the todos
        return res.send({
            success: true,
            message: 'todos founded',
            todos: todos
        })
    } catch (error) {
        return res.send({
            success: false,
            message: `something went wrong: ${error}`
        })
    }
}

async function getTodos(req, res) {
    const { body } = req;
    // let { id } = body;

    try {
        const todos = await Todo.find();
        if (!todos[0]) {
            return res.send({
                success: false,
                message: 'Error: todo not found'
            });
        }

        return res.send({
            success: true,
            message: 'todo found',
            todos: todos
        })

    } catch (error) {
        return res.send({
            success: false,
            message: `something went wrong: ${error}`
        })
    }

}

async function storeTodo(req, res) {
    const { body } = req;
    let {
        name,
        description
    } = body;

    if (!name) {
        return res.send({
            success: false,
            message: 'Error: provide a name to the task'
        })
    }
    if (!description) {
        return res.send({
            success: false,
            message: 'Error: what has to be done ?'
        })
    }
    try {

        // Check exiting todo
        const existingTodo = await Todo.find({ name: name });
        console.log("existing visitor : ", existingVisitor);
        if (existingTodo[0]) {
            return res.send({
                success: false,
                message: 'Error: name in use'
            });
        }

        // Save visitor
        const newTodo = new Todo();
        newVisitor.name = name;
        newVisitor.description = description;
        const savedTodo = await newTodo.save();
        return res.send({
            success: true,
            message: 'todo succesfull added',
            todo: savedTodo
        });
    } catch (error) {
        return res.send({
            success: false,
            message: `something went wrong: ${error}`
        })
    }
}

async function updateTodos(req, res) {
    const { body } = req;
    let {
        id,
        name,
        description
    } = body;

    try {
        const existingTodo = await Todo.find({ id: id });
        if (!existingTodo[0]) {
            return res.send({
                success: false,
                message: 'Error: to do not found'
            });
        }

        const { foundedTodoName, foundedTodoDescrition } = existingTodo[0];

        const newTodo = new Todo();

        if (foundedTodoName != name) {
            newTodo.name = name;
        }
        if (foundedTodoDescrition != description) {
            newTodo.description = description
        }

        const savedTodo = await Todo.save(newTodo);
        return res.send({
            success: true,
            message: "todo edited",
            todo: savedTodo
        })

    } catch (error) {
        return res.send({
            success: false,
            message: `something went wrong: ${error}`
        })
    }

}

async function removeTodo(req, res) {
    const { body } = req;
    let {
        id
    } = body;

    try {
        const existingTodo = await Todo.find({ id: id });
        if (!existingTodo[0]) {
            return res.send({
                success: false,
                message: 'Error: todo not found'
            });
        }
        const remainingTodo = await Todo.deleteOne({ id: id });
        return res.send({
            success: true,
            message: "todo deleted",
            remainingTodo: remainingTodo
        })

    } catch (error) {
        return res.send({
            success: false,
            message: `something went wrong: ${error}`
        })
    }
}

module.exports = {
    getTodos,
    getTodo,
    updateTodos,
    removeTodo,
    storeTodo
}
