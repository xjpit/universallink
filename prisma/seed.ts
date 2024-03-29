import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    
    const account = await prisma.account.create({
        data: {
            email: 'gcyong04@gmail.com',  
        }
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })