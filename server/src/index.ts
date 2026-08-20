import express, {
    Request,
    Response,
    NextFunction
} from "express";

import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { notFound } from "./middleware/notFound";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

/* -------------------------------------------------------------------------- */
/* Middleware                                                                 */
/* -------------------------------------------------------------------------- */
const allowedOrigins = [
    "http://localhost:3000",
    "https://www.njiloportfolio.de",
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/* -------------------------------------------------------------------------- */
/* MongoDB                                                                    */
/* -------------------------------------------------------------------------- */
const username = encodeURIComponent(process.env.MONGO_USERNAME || "admin");
const password = encodeURIComponent(process.env.MONGO_PASSWORD || "admin123");

const host = process.env.MONGO_HOST || "localhost";
const port = process.env.MONGO_PORT || "27017";
const database = process.env.MONGO_DATABASE || "portfolio_db_dev";

const mongoUri =
    `mongodb://${username}:${password}` +
    `@${host}:${port}/${database}?authSource=admin`;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.info("MongoDB Connected");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error.message);
    });

mongoose.connection.once("open", () => {
    console.info("MongoDB database connection established successfully");
});
/* -------------------------------------------------------------------------- */
/* Routes                                                                     */
/* -------------------------------------------------------------------------- */
import timestampRouter from './modules/timestamp/timestamp.routes';
import excerciseRouter from "./modules/exercise/excercise.routes";
import whoiamRouter from "./modules/reqHeaderParser/reqHeaderParser";
import shortUrlRouter from "./modules/urlShortener/shortUrl.routes";
import todosRouter from "./modules/todo/todo";
import sessionRouter from "./modules/session/session";
import contactRouter from "./modules/contact/contact.routes";
import fileMetaRouter from "./modules/fileMetaData/fileMetaData";
import projectRoutes from "./modules/project/project.routes";
import visitorRoutes from "./modules/visitor/visitor.routes";
import { errorHandler } from "./middleware/error.middleware";

app.use("/api/timestamp", timestampRouter);
app.use("/api/whoiam", whoiamRouter);
app.use("/api/shorturl", shortUrlRouter);
app.use("/api/excercise", excerciseRouter);
app.use("/api/todo", todosRouter);
app.use("/api/session", sessionRouter);
app.use("/api/filemeta", fileMetaRouter);
app.use("/api/contact", contactRouter);
app.use("/api/projects", projectRoutes);
app.use("/api/visitor", visitorRoutes);

app.use(errorHandler);
app.use(notFound);

/* -------------------------------------------------------------------------- */
/* Health check                                                               */
/* -------------------------------------------------------------------------- */
app.get(
    "/health",
    (req: Request, res: Response) => {
        res.status(200).send("ok");
    }
);

/* -------------------------------------------------------------------------- */
/* Root                                                                       */
/* -------------------------------------------------------------------------- */
app.get(
    "/",
    (req: Request, res: Response) => {
        res.send("Yannick Njilo Portfolio backend");
    }
);

/* -------------------------------------------------------------------------- */
/* Start server                                                               */
/* -------------------------------------------------------------------------- */
const PORT = Number(process.env.SERVERPORT) || 5000;

app.listen(
    PORT,
    () => {
        console.info(`Server is running on port : ${PORT}`);
    }
);