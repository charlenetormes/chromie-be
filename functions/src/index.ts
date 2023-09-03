import * as functions from "firebase-functions";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

const expressApp = express();
const port = process.env.PORT || 3000;

expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));
expressApp.use(cors());

/**
 * Middleware to set our headers for all of our responses from our API
 */
expressApp.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

/**
 * Declaring all of our api routes
 */
// expressApp.use(userRoutes);
// expressApp.use(templateRoutes);
// expressApp.use(nudgeRoutes);
// expressApp.use(completedRoutes);
// expressApp.use(googleRoutes);

/**
 * Export our node.js/backend application to Cloud Functions
 */
export const app = functions.https.onRequest(expressApp);
