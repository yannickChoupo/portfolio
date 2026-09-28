import { Request, Response } from "express";
import mongoose from "mongoose";
import * as requirementService from "../requirement/requirement.service";
import * as todoService from "./todo.service";
import * as projectService from "../project/project.service";
import Requirement from "../requirement/requirement.model";

export const getProjectTodos = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { projectId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            res.status(400).json({
                error: "Invalid project ID"
            });
            return;
        }

        const project =
            await projectService.getProjectById(projectId);

        if (!project) {
            res.status(404).json({
                error: "Project not found"
            });
            return;
        }

        const todos =
            await todoService.getTodosByProject(projectId);

        res.status(200).json({
            todos
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch project todos"
        });
    }
};

export const createProjectTodo = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { projectId } = req.params;

        const {
            requirementId,
            name,
            title,
            description,
            status,
            order
        } = req.body;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            res.status(400).json({
                error: "Invalid project ID"
            });
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(requirementId)) {
            res.status(400).json({
                error: "Invalid requirement ID"
            });
            return;
        }

        if (!name) {
            res.status(400).json({
                error: "Todo name is required"
            });
            return;
        }

        const project =
            await projectService.getProjectById(projectId);

        if (!project) {
            res.status(404).json({
                error: "Project not found"
            });
            return;
        }

        // Find requirement AND verify that it belongs
        // to the requested project.
        const requirement =
            await Requirement.findOne({
                _id: requirementId,
                project: projectId
            });

        if (!requirement) {
            res.status(404).json({
                error: "Requirement not found for this project"
            });
            return;
        }

        const alreadyExists =
            await todoService.todoExistsInRequirement(
                requirementId,
                name
            );

        if (alreadyExists) {
            res.status(409).json({
                error: "Todo already exists in this requirement"
            });
            return;
        }

        const todo =
            await todoService.createTodo({
                requirement: requirementId,
                name,
                title: title || name,
                description: description || "",
                status: status || "TODO",
                order: order || 0
            });

        res.status(201).json({
            todo
        });
    } catch (error) {
        console.error(
            "createProjectTodo:",
            error
        );

        res.status(500).json({
            error: "Failed to create project todo"
        });
    }
};
/**
 * GET /api/todos
 */
export const getTodos = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const todos = await todoService.getTodos();

        res.status(200).json({
            todos
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch todos"
        });
    }
};

/**
 * GET /api/todos/:todoId
 */
export const getTodo = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { todoId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(todoId)) {
            res.status(400).json({
                error: "Invalid todo ID"
            });
            return;
        }

        const todo = await todoService.getTodoById(todoId);

        if (!todo) {
            res.status(404).json({
                error: "Todo not found"
            });
            return;
        }

        res.status(200).json({
            todo
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch todo"
        });
    }
};

/**
 * POST /api/todos
 */
export const storeTodo = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            requirement,
            name,
            title,
            scope,
            description
        } = req.body;

        if (!requirement || !name || !title || !scope) {
            res.status(400).json({
                error: "Requirement, name, title and scope are required"
            });
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(requirement)) {
            res.status(400).json({
                error: "Invalid requirement ID"
            });
            return;
        }

        const existingRequirement =
            await requirementService.getRequirementById(
                requirement
            );

        if (!existingRequirement) {
            res.status(404).json({
                error: "Requirement not found"
            });
            return;
        }

        const alreadyExists =
            await todoService.todoExistsInRequirement(
                requirement,
                name
            );

        if (alreadyExists) {
            res.status(409).json({
                error: "Todo already exists in this requirement"
            });
            return;
        }

        const todo = await todoService.createTodo({
            requirement,
            name,
            title,
            description
        });

        res.status(201).json({
            todo
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to create todo"
        });
    }
};
/**
 * PUT /api/todos/:todoId
 */
export const updateTodo = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { todoId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(todoId)) {
            res.status(400).json({
                error: "Invalid todo ID"
            });
            return;
        }

        const { name, description, completed } = req.body;

        const updateData: {
            name?: string;
            description?: string;
            completed?: boolean;
        } = {};

        if (name !== undefined) {
            updateData.name = name.trim();
        }

        if (description !== undefined) {
            updateData.description = description.trim();
        }

        if (completed !== undefined) {
            updateData.completed = completed;
        }

        const todo = await todoService.updateTodo(
            todoId,
            updateData
        );

        if (!todo) {
            res.status(404).json({
                error: "Todo not found"
            });
            return;
        }

        res.status(200).json({
            todo
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to update todo"
        });
    }
};

/**
 * DELETE /api/todos/:todoId
 */
export const removeTodo = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { todoId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(todoId)) {
            res.status(400).json({
                error: "Invalid todo ID"
            });
            return;
        }

        const todo = await todoService.deleteTodo(todoId);

        if (!todo) {
            res.status(404).json({
                error: "Todo not found"
            });
            return;
        }

        res.status(200).json({
            message: "Todo deleted successfully",
            todo
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to delete todo"
        });
    }
};