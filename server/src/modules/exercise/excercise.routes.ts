import { Router, Request, Response } from "express";
import { asyncHandler } from "../../middleware/async-handle";
import * as exerciseController from "./exercise.controller";

const router = Router();

router.get("/", (req: Request, res: Response): void => {
    res.json("exercise microservice");
});

router.get("/users",
    asyncHandler(exerciseController.getAllExerciseUsers));

router.post(
    "/users",
    asyncHandler(exerciseController.registerExerciseUser)
);

router.post(
    "/users/:id/exercises",
    asyncHandler(exerciseController.addExercise)
);

router.get(
    "/users/:_id/logs",
    //  asyncHandler(exerciseController.getLogs)
);

export default router;