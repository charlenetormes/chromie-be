import { Request, Response } from "express";
import { create, suggest } from "../store/users.store";

export const createUser = async (req: Request, res: Response) => {
    try {
        const email = req.body.email ?? null;
        const password = req.body.password ?? null;

        const data = await create({
            email: email,
            password: password,
        });
        return res.status(200).send({
            code: 200,
            message: "Success",
            data: data,
        });
    } catch (e) {
        return res.status(400).send({
            code: 400,
            message: e,
        });
    }
};

export const suggestMessage = async (req: Request, res: Response) => {
    try {
        const message = req.body.message ?? null;
        const mood = req?.body?.mood ?? ["formal"];
        const data = await suggest(message, mood);

        return res.status(200).send({
            code: 200,
            message: "Success",
            data: data,
        });
    } catch (e) {
        return res.status(400).send({
            code: 400,
            message: e,
        });
    }
};
