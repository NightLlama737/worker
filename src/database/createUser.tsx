import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Worker = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string; // Use `number` instead of `int` in TypeScript
    worker_Id: string;
};

async function main({firstName,lastName,email,phone,worker_Id}:Worker) {

    // Ensure Prisma schema fields match the field names
    await prisma.registeredUsers.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            worker_Id:worker_Id
        },
    });

    const allUsers = await prisma.registeredUsers.findMany();
    console.dir(allUsers, { depth: null });
}

const createUser = ({firstName,lastName,email,phone,worker_Id}:Worker) => {
    main({firstName,lastName,email,phone,worker_Id})
        .then(async () => {
            await prisma.$disconnect();
        })
        .catch(async (e) => {
            console.error(e);
            await prisma.$disconnect();
            process.exit(1);
        });
};

export default createUser