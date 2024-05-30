// prisma.ts
import { PrismaClient } from '@prisma/client';

// Check if PrismaClient is already defined in global object to prevent multiple instances of PrismaClient in development
declare global {
    var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;