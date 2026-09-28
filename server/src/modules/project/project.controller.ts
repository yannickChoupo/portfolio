import { timingSafeEqual } from "node:crypto";
import { Request, Response } from "express";
import * as projectService from "./project.service";
import * as requirementService from "../requirement/requirement.service";

import mongoose from "mongoose";
import { githubProjects } from "./tempData";


export const getProjects = async (
    _req: Request,
    res: Response
): Promise<void> => {
    const projects = await projectService.getProjects();

    res.status(200).json({
        projects
    });
};

export const getGithubProjectsV2 = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const projects =
            await projectService.getGithubProjectsV2();

        res.status(200).json({
            projects,
            fallback: false,
        });
    } catch (error) {
        console.error(
            "GitHub Projects unavailable:",
            error
        );

        res.status(200).json({
            projects: githubProjects,
            fallback: true,
        });
    }
};


export const refreshGithubProjectsV2 = async (
    req: Request,
    res: Response
): Promise<void> => {
    const configuredKey = process.env.ADMIN_REFRESH_KEY;
    const suppliedKey = req.header("x-admin-refresh-key");

    if (!configuredKey) {
        res.status(503).json({
            error: "Admin GitHub refresh is not configured"
        });
        return;
    }

    const configuredKeyBuffer = Buffer.from(configuredKey);
    const suppliedKeyBuffer = Buffer.from(suppliedKey ?? "");
    const keyMatches =
        configuredKeyBuffer.length === suppliedKeyBuffer.length &&
        timingSafeEqual(configuredKeyBuffer, suppliedKeyBuffer);

    if (!keyMatches) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    try {
        const projects =
            await projectService.refreshGithubProjectsV2();

        res.status(200).json({
            projects,
            fallback: false,
            refreshed: true,
        });
    } catch (error) {
        console.error("GitHub Projects refresh failed:", error);
        res.status(502).json({
            error: "GitHub Projects refresh failed"
        });
    }
};

export const getProjectById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { projectId } = req.params;

    const project = await projectService.getProjectById(projectId);

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


export const createProjectRequirement = async (
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

        const {
            name,
            description,
            scope,
            status,
            order
        } = req.body;

        if (!name) {
            res.status(400).json({
                error: "Requirement name is required"
            });
            return;
        }

        const requirement =
            await requirementService.createRequirement({
                projectId: projectId,
                name,
                description,
                scope,
                status: status || "TODO",
                order: order || 0
            });

        res.status(201).json({
            requirement
        });
    } catch (error) {
        console.error(
            "createProjectRequirement:",
            error
        );

        res.status(500).json({
            error: "Failed to create project requirement"
        });
    }
};

export const getProjectRequirements = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { projectId } = req.params;

    const project = await projectService.getProjectById(projectId);

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

export const createProject = async (
    req: Request,
    res: Response
): Promise<void> => {
    const project = await projectService.createProject(req.body);

    res.status(201).json({
        project
    });
};

export const updateProject = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { projectId } = req.params;

    const project = await projectService.updateProject(
        projectId,
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

export const deleteProject = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { projectId } = req.params;

    const project = await projectService.deleteProject(projectId);

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