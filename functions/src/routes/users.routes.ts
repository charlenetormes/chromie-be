import * as express from "express";
import {
    createUser,
    sentimentAnalysis,
    suggestMessage,
} from "../controllers/users.controllers";

const userRouter = express.Router();

/**
 *
 * Routes for the /users endpoint
 *
 */
userRouter.post("/users", createUser);
userRouter.post("/users/suggest", suggestMessage);
userRouter.post("/users/sentiment", sentimentAnalysis);

export default userRouter;
