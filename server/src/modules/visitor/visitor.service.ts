import { randomUUID } from "crypto";
import Visitor from "../../models/visitor.model";

export const registerVisit = async (
    visitorId?: string
): Promise<{
    visitorId: string;
    isNewVisitor: boolean;
}> => {
    
    if (!visitorId) {
        const newVisitorId = randomUUID();

        await Visitor.create({
            visitorId: newVisitorId,
            firstSeen: new Date(),
            lastSeen: new Date(),
            visitCount: 1,
        });

        return {
            visitorId: newVisitorId,
            isNewVisitor: true,
        };
    }

    const visitor = await Visitor.findOneAndUpdate(
        { visitorId },
        {
            $set: {
                lastSeen: new Date(),
            },
            $inc: {
                visitCount: 1,
            },
        },
        {
            new: true,
        }
    );

    // Cookie may have been deleted or the database may have
    // no longer contain the visitor.
    if (!visitor) {
        const newVisitorId = randomUUID();

        await Visitor.create({
            visitorId: newVisitorId,
            firstSeen: new Date(),
            lastSeen: new Date(),
            visitCount: 1,
        });

        return {
            visitorId: newVisitorId,
            isNewVisitor: true,
        };
    }

    return {
        visitorId: visitor.visitorId,
        isNewVisitor: false,
    };
};

export const getVisitorStats = async () => {
    const [result] = await Visitor.aggregate([
        {
            $group: {
                _id: null,
                uniqueVisitors: { $sum: 1 },
                visits: { $sum: "$visitCount" },
            },
        },
    ]);

    return {
        uniqueVisitors: result?.uniqueVisitors ?? 0,
        visits: result?.visits ?? 0,
    };
};