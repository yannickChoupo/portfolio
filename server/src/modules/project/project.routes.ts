import { Router } from "express";

import {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} from "./project.controller";

const router = Router();

/*
 * Public
 */
router.get("/", getProjects);
router.get("/:id", getProjectById);

/*
 * Admin
 *
 * Add your authentication middleware here once
 * the admin project management UI is implemented.
 */

// router.post("/", authMiddleware, createProject);
// router.put("/:id", authMiddleware, updateProject);
// router.delete("/:id", authMiddleware, deleteProject);

router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
