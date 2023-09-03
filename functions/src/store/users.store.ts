import { db } from "../firebase";
import { User } from "../types/user.interface";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "",
});

export const create = async (user: User) => {
    try {
        const userRef = db.ref("users");

        const key = userRef.push().key;

        await userRef
            .child(key)
            .set({
                email: user.email,
                password: user.password,
            })
            .then((res) => {
                console.log("res here: ", res);
                return res;
            });
    } catch (e) {
        return null;
    }
};

export const suggest = async (message: string, mood: string[]) => {
    const completion = await openai.completions.create({
        model: "gpt-3.5-turbo",
        prompt: `
            ${message}

            Suggest another way of saying the message above in a ${mood.join(
                ","
            )} way.
        `,
        max_tokens: 7,
        temperature: 0,
    });

    console.log(completion.choices);
    return completion.choices;
};
