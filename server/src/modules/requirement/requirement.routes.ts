import { Router } from "express";

import {
    createRequirement,
    getProjectRequirements,
    getRequirement,
    getRequirements,
    removeRequirement,
    updateRequirement
} from "../requirement/requirement.controller";
import { createProjectTodo, getProjectTodos } from "../todo/todo.controller";


const router = Router();

router.get("/", getRequirements);
router.get("/:requirementId", getRequirement);

router.post("/", createRequirement);
router.put("/:requirementId", updateRequirement);
router.delete("/:requirementId", removeRequirement);

// Requirements
router.get(
    "/:projectId/requirements",
    getProjectRequirements
);

// Todos
router.get(
    "/:projectId/todos",
    getProjectTodos
);

router.post(
    "/:projectId/todos",
    createProjectTodo
);

export default router;