import { Router } from "express";

import {
    getTodos,
    getTodo,
    storeTodo,
    updateTodo,
    removeTodo
} from "./todo.controller";

const router = Router();

router.get("/", getTodos);
router.get("/:todoId", getTodo);

router.post("/", storeTodo);
router.put("/:todoId", updateTodo);
router.delete("/:todoId", removeTodo);

export default router;