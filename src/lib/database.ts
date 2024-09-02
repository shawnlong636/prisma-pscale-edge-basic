import { PrismaClient } from "@prisma/client";
import { PrismaPlanetScale } from "@prisma/adapter-planetscale";
import { Client } from "@planetscale/database";

import { DATABASE_URL } from "$env/static/private";

export const runtime = "edge";
const client = new Client({ url: process.env.DATABASE_URL });
const adapter = new PrismaPlanetScale(client);

export const prisma = new PrismaClient({ adapter });
