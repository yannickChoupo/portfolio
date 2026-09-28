import { Request, Response } from "express";
import mongoose from "mongoose";

import * as requirementService
    from "./requirement.service";

import * as projectService
    from "../project/project.service";
import { RequirementScope } from "./requirement.model";

/**
 * GET /api/requirements
 */
export const getRequirements = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const requirements =
            await requirementService.getRequirements();

        res.status(200).json({
            requirements
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch requirements"
        });
    }
};

/**
 * GET /api/requirements/:requirementId
 */
export const getRequirement = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { requirementId } = req.params;

        if (
            !mongoose.Types.ObjectId.isValid(
                requirementId
            )
        ) {
            res.status(400).json({
                error: "Invalid requirement ID"
            });
            return;
        }

        const requirement =
            await requirementService.getRequirementById(
                requirementId
            );

        if (!requirement) {
            res.status(404).json({
                error: "Requirement not found"
            });
            return;
        }

        res.status(200).json({
            requirement
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch requirement"
        });
    }
};

/**
 * GET /api/projects/:projectId/requirements
 */
export const getProjectRequirements = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { projectId } = req.params;

        if (
            !mongoose.Types.ObjectId.isValid(projectId)
        ) {
            res.status(400).json({
                error: "Invalid project ID"
            });
            return;
        }

        const project =
            await projectService.getProjectById(
                projectId
            );

        if (!project) {
            res.status(404).json({
                error: "Project not found"
            });
            return;
        }

        const requirements =
            await requirementService
                .getRequirementsWithTodosByProject(
                    projectId
                );

        res.status(200).json({
            requirements
        });
    } catch (error) {
        console.error(
            "getProjectRequirements:",
            error
        );

        res.status(500).json({
            error: "Failed to fetch project requirements"
        });
    }
};

/**
 * POST /api/requirements
 */
export const createRequirement = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            name,
            description,
            scope
        } = req.body;

        const { projectId } = req.params;


        if (!projectId || !name) {
            res.status(400).json({
                error: "Project and name are required"
            });
            return;
        }

        if (
            !mongoose.Types.ObjectId.isValid(projectId)
        ) {
            res.status(400).json({
                error: "Invalid project ID"
            });
            return;
        }

        const existingProject =
            await projectService.getProjectById(
                projectId
            );

        if (!existingProject) {
            res.status(404).json({
                error: "Project not found"
            });
            return;
        }

        const requirement =
            await requirementService.createRequirement({
                projectId,
                name,
                description,
                scope
            });

        res.status(201).json({
            requirement
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to create requirement"
        });
    }
};

/**
 * PUT /api/requirements/:requirementId
 */
export const updateRequirement = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { requirementId } = req.params;

        if (
            !mongoose.Types.ObjectId.isValid(
                requirementId
            )
        ) {
            res.status(400).json({
                error: "Invalid requirement ID"
            });
            return;
        }

        const {
            name,
            description,
            scope
        } = req.body;

        const updateData: {
            name?: string;
            description?: string;
            scope?: RequirementScope;
        } = {};

        if (name !== undefined) {
            updateData.name = name.trim();
        }

        if (description !== undefined) {
            updateData.description =
                description.trim();
        }

        if (scope !== undefined) {
            updateData.scope = scope;
        }

        const requirement =
            await requirementService.updateRequirement(
                requirementId,
                updateData
            );

        if (!requirement) {
            res.status(404).json({
                error: "Requirement not found"
            });
            return;
        }

        res.status(200).json({
            requirement
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to update requirement"
        });
    }
};

/**
 * DELETE /api/requirements/:requirementId
 */
export const removeRequirement = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { requirementId } = req.params;

        if (
            !mongoose.Types.ObjectId.isValid(
                requirementId
            )
        ) {
            res.status(400).json({
                error: "Invalid requirement ID"
            });
            return;
        }

        const requirement =
            await requirementService.deleteRequirement(
                requirementId
            );

        if (!requirement) {
            res.status(404).json({
                error: "Requirement not found"
            });
            return;
        }

        res.status(200).json({
            message: "Requirement deleted successfully",
            requirement
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to delete requirement"
        });
    }
};