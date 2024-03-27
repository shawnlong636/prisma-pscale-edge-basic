import { PrismaClient } from "@prisma/client";
import { PrismaPlanetScale } from "@prisma/adapter-planetscale";
import { Client } from "@planetscale/database";

import { DATABASE_URL } from "$env/static/private";
import type { PrismaClientOptions } from "@prisma/client/runtime/library";

const client = new Client({ url: process.env.DATABASE_URL });
const adapter = new PrismaPlanetScale(client);

const options: PrismaClientOptions = {
    adapter: adapter,
};

export const prisma = new PrismaClient({ adapter });
