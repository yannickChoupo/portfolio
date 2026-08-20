import { Request, Response } from "express";
import * as visitorService from "./visitor.service";

const COOKIE_NAME = "visitor_id";

export const registerVisit = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const existingVisitorId = req.cookies?.[COOKIE_NAME];
        const result = await visitorService.registerVisit(
            existingVisitorId
        );

        // Only set a cookie when a NEW visitor was created
        if (result.isNewVisitor && result.visitorId) {
            res.cookie(COOKIE_NAME, result.visitorId, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24 * 365,
                path: "/",
            });
        }

        res.status(200).json({
            success: true,
            isNewVisitor: result.isNewVisitor,
        });

    } catch (error) {
        console.error("Register visitor error:", error);

        res.status(500).json({
            success: false,
            error: error instanceof Error
                ? error.message
                : "Unknown error",
        });
    }
};

export const getStats = async (
    _req: Request,
    res: Response
): Promise<void> => {
    const stats = await visitorService.getVisitorStats();
    res.status(200).json(stats);
};