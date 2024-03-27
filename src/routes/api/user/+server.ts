import type { User } from "@prisma/client";
import { prisma } from "$lib/database";

import type { RequestHandler } from "./$types";

function generateRandomString(length: number): string {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return result;
}

function generateRandomName(): string {
    const firstNames = [
        "John",
        "Jane",
        "Alice",
        "Bob",
        "Charlie",
        "David",
        "Eve",
        "Frank",
        "Grace",
        "Hank",
    ];
    const lastNames = [
        "Smith",
        "Johnson",
        "Williams",
        "Jones",
        "Brown",
        "Davis",
        "Miller",
        "Wilson",
        "Moore",
        "Taylor",
    ];
    return (
        firstNames[Math.floor(Math.random() * firstNames.length)] +
        " " +
        lastNames[Math.floor(Math.random() * lastNames.length)]
    );
}

const runtime = "edge";

export const POST = (async () => {
    console.log("Creating user");
    const user: User = await prisma.user.create({
        data: {
            email: generateRandomString(10) + "@example.com",
            name: generateRandomName(),
        },
    });
    if (!user) {
        console.error("Failed to create user");
        return new Response(null, {
            status: 500,
        });
    }

    return new Response(null, {
        status: 200,
    });
}) satisfies RequestHandler;

export const GET = async () => {
    const users: User[] = await prisma.user.findMany();

    if (!users) {
        return new Response(JSON.stringify([] as User[]), {
            status: 200,
        });
    }

    return new Response(JSON.stringify(users), {
        status: 200,
    });
};

export const DELETE = async () => {
    await prisma.user.deleteMany();
    return new Response(null, {
        status: 200,
    });
};
