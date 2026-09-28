import Requirement, { IRequirement } from "../requirement/requirement.model";
import Todo from "./todo.model";

export const getTodos = async () => {
    return Todo
        .find()
        .populate({
            path: "requirement",
            select: "name scope project",
            populate: {
                path: "project",
                select: "name slug"
            }
        })
        .sort({ createdAt: -1 });
};

export const getTodoById = async (
    todoId: string
) => {
    return Todo
        .findById(todoId)
        .populate({
            path: "requirement",
            select: "name scope project",
            populate: {
                path: "project",
                select: "name slug"
            }
        });
};

export const getTodosByRequirement = async (
    requirementId: string
) => {
    return Todo
        .find({ requirement: requirementId })
        .sort({ createdAt: 1 });
};

export const getTodosByProject = async (
    projectId: string
) => {
    const requirements = await Requirement
        .find({ project: projectId })
        .select("_id");

    const requirementIds = requirements.map(
        (requirement: IRequirement) => requirement._id
    );

    return Todo
        .find({
            requirement: {
                $in: requirementIds
            }
        })
        .sort({ createdAt: 1 });
};

export const todoExistsInRequirement = async (
    requirementId: string,
    name: string
) => {
    return Todo.exists({
        requirement: requirementId,
        name: name.trim()
    });
};

export const createTodo = async (data: {
    requirement: string;
    name: string;
    title: string;
    order?: number,
    status?: string,
    description?: string;
}) => {
    return Todo.create({
        requirement: data.requirement,
        name: data.name.trim(),
        title: data.title.trim(),
        description: data.description?.trim() ?? "",
        status: "TODO"
    });
};

export const updateTodo = async (
    todoId: string,
    data: {
        name?: string;
        title?: string;
        description?: string;
        status?: string;
        scope?: string;
    }
) => {
    return Todo.findByIdAndUpdate(
        todoId,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

export const deleteTodo = async (
    todoId: string
) => {
    return Todo.findByIdAndDelete(todoId);
};