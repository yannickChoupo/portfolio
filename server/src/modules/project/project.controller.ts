import { Request, Response } from "express";
import * as projectService from "./project.service";

/**
 * GET /api/projects
 */
export const getProjects = async (
    _req: Request,
    res: Response
): Promise<void> => {
    const projects = await projectService.getProjects();

    res.status(200).json({
        projects
    });
};

/**
 * GET /api/projects/:id
 */
export const getProjectById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    const project = await projectService.getProjectById(id);

    if (!project) {
        res.status(404).json({
            error: "Project not found"
        });

        return;
    }

    res.status(200).json({
        project
    });
};

/**
 * POST /api/projects
 */
export const createProject = async (
    req: Request,
    res: Response
): Promise<void> => {
    const project = await projectService.createProject(req.body);

    res.status(201).json({
        project
    });
};

/**
 * PUT /api/projects/:id
 */
export const updateProject = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    const project = await projectService.updateProject(
        id,
        req.body
    );

    if (!project) {
        res.status(404).json({
            error: "Project not found"
        });

        return;
    }

    res.status(200).json({
        project
    });
};

/**
 * DELETE /api/projects/:id
 */
export const deleteProject = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    const project = await projectService.deleteProject(id);

    if (!project) {
        res.status(404).json({
            error: "Project not found"
        });

        return;
    }

    res.status(200).json({
        message: "Project deleted successfully",
        project
    });
};
