import { db } from "../firebase";
import { User } from "../types/user.interface";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "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",
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
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant.",
            },
            {
                role: "user",
                content: `
                    ${message}
        
                    Suggest another way of saying the message above in a ${mood.join(
                        ","
                    )} way.
                `,
            },
        ],
        temperature: 0,
    });

    return completion?.choices?.[0]?.message?.content;
};

export const sentiment = async (message: string, mood: string[]) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant.",
            },
            {
                role: "user",
                content: `
                    ${message}
        
                    What is the tone of the message above? Only categorize them as happy, neutral, and sad/angry. Only answer 1 if happy, 2 if neutral, and 3 if sad/angry.
                `,
            },
        ],
        temperature: 0,
    });

    return completion?.choices?.[0]?.message?.content;
};
