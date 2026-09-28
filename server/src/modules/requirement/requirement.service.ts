import Todo from "../todo/todo.model";
import Requirement, { RequirementScope } from "./requirement.model";

export const getRequirements = async () => {
    return Requirement
        .find()
        .populate("project", "name slug")
        .sort({ createdAt: -1 });
};

export const getRequirementById = async (
    requirementId: string
) => {
    return Requirement
        .findById(requirementId)
        .populate("project", "name slug");
};

export const getRequirementsByProject = async (
    projectId: string
) => {
    return Requirement
        .find({ project: projectId })
        .sort({ createdAt: 1 });
};

export const createRequirement = async (data: {
    projectId: string;
    name: string;
    description?: string;
    scope?: string;
    status?: string;
    order?: number;
}) => {
    return Requirement.create({
        project: data.projectId,
        name: data.name.trim(),
        description: data.description?.trim() ?? "",
        scope: data.scope ?? "OVERALL"
    });
};

export const updateRequirement = async (
    requirementId: string,
    data: {
        name?: string;
        description?: string;
        scope?: RequirementScope;
    }
) => {
    return Requirement.findByIdAndUpdate(
        requirementId,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

export const deleteRequirement = async (
    requirementId: string
) => {
    return Requirement.findByIdAndDelete(
        requirementId
    );
};

export const getRequirementsWithTodosByProject = async (
    projectId: string
) => {
    const requirements =
        await Requirement.find({
            project: projectId
        })
            .sort({ order: 1 })
            .lean();

    const requirementIds =
        requirements.map(
            (requirement) => requirement._id
        );

    const todos = await Todo.find({
        requirement: {
            $in: requirementIds
        }
    })
        .sort({ order: 1 })
        .lean();

    return requirements.map(
        (requirement) => ({
            ...requirement,

            todos: todos.filter(
                (todo: any) =>
                    todo.requirement.toString() ===
                    requirement._id.toString()
            )
        })
    );
};