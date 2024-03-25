import type { User } from "@prisma/client";
import { prisma } from "$lib/database";

import { faker } from "@faker-js/faker";

import type { RequestHandler } from "./$types";

export const POST = (async () => {
    console.log("Creating user");
    const user: User = await prisma.user.create({
        data: {
            email: faker.internet.email(),
            name: faker.person.fullName(),
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
