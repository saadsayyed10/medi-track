"use strict";
// backend/src/lib/prisma.orm.ts
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// Instatiate prisma client for ORM operations
const prisma = new client_1.PrismaClient();
exports.default = prisma;
