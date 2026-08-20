import { Request, Response } from "express";
import Todo from "../../models/todo";

const getTodo = async (_req: Request, res: Response) => {
    try {
        // Authenticate userName
        const todos = await Todo.find();

        if (!todos) {
            return res.send({
                success: false,
                message: 'Error: no todo added jet'
            });
        }
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

const getTodos = async (_req: Request, res: Response) => {
    // const { body } = req;
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

const storeTodo = async (req: Request, res: Response) => {
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
        if (existingTodo[0]) {
            return res.send({
                success: false,
                message: 'Error: name in use'
            });
        }

        // Save visitor
        const newTodo = new Todo();
        newTodo.name = name;
        newTodo.description = description;
        newTodo.completed = false;
        newTodo.id = newTodo._id;

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

const updateTodos = async (req: Request, res: Response) => {
    const { body } = req;
    let {
        id,
        name,
        description,
        completed
    } = body;

    try {
        const existingTodo = await Todo.find({ id: id });
        if (!existingTodo[0]) {
            return res.send({
                success: false,
                message: 'Error: to do not found'
            });
        }

        const foundedTodo = existingTodo[0];

        // Build update object with only changed fields
        const updateData: typeof Todo = {};

        if (name !== undefined && name !== foundedTodo.name) {
            updateData.name = name;
        }
        if (description !== undefined && description !== foundedTodo.description) {
            updateData.description = description;
        }
        if (completed !== undefined && completed !== foundedTodo.completed) {
            updateData.completed = completed;
        }

        // Update the todo
        const updatedTodo = await Todo.findOneAndUpdate(
            { id: id },
            updateData,
            { new: true }
        );

        return res.send({
            success: true,
            message: "todo edited",
            todo: updatedTodo
        })

    } catch (error) {
        return res.send({
            success: false,
            message: `something went wrong: ${error}`
        })
    }

}

const removeTodo = async (req: Request, res: Response) => {
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

export { getTodos, getTodo, updateTodos, removeTodo, storeTodo };
