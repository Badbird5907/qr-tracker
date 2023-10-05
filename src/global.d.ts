import {PrismaClient} from "@prisma/client";

declare global {
    interface Window {
    }
    var prisma: PrismaClient
}
export { }
