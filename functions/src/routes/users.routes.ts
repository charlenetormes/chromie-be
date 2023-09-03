import * as express from "express";
import { createUser, suggestMessage } from "../controllers/users.controllers";

const userRouter = express.Router();

/**
 *
 * Routes for the /users endpoint
 *
 */
userRouter.post("/users", createUser);
userRouter.post("/users/suggest", suggestMessage);

export default userRouter;
