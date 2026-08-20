import { Router } from "express";
import {
    registerVisit,
    getStats,
} from "./visitor.controller";

const router = Router();

router.post("/", registerVisit);
router.get("/stats", getStats);

export default router;