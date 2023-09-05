import { db } from "../firebase";
import { User } from "../types/user.interface";
import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
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
        
                    What is the tone of the message above? Categorize them as positive tone, neutral tone, and negative tone. 1 if positive, 2 if neutral, and 3 if negative.

                    Reply with a format: 
                    Emotion: [insert 1, 2, or 3 here]

                    [Insert the tone of the message above with some description about why that tone is categorized as that here]
                `,
            },
        ],
        temperature: 0,
    });

    const result = completion?.choices?.[0]?.message?.content?.split("\n\n");
    const data = {
        tone: result[0],
        message: result[1],
    };

    return data;
};

export const summarize = async (message: string) => {
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
        
                    Summarize the message above in bullet form
                `,
            },
        ],
        temperature: 0,
    });

    return completion?.choices?.[0]?.message?.content;
};
