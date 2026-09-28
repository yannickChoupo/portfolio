import { Router } from "express";

import {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    createProjectRequirement,
    getGithubProjectsV2,
    refreshGithubProjectsV2
} from "./project.controller";

import {
    createProjectTodo,
    getProjectTodos
} from "../todo/todo.controller";
import { getProjectRequirements } from "../requirement/requirement.controller";

const router = Router();


router.get("/", getProjects);

router.get("/github", getGithubProjectsV2);

router.post("/github/refresh", refreshGithubProjectsV2);

router.get("/:projectId", getProjectById);

router.post("/", createProject);

router.put("/:projectId", updateProject);

router.delete("/:projectId", deleteProject);

// Project-specific requirements
router.get(
    "/:projectId/requirements",
    getProjectRequirements
);

router.post(
    "/:projectId/requirements",
    createProjectRequirement
);

// Project-specific todos
router.get(
    "/:projectId/todos",
    getProjectTodos
);

router.post(
    "/:projectId/todos",
    createProjectTodo
);

export default router;