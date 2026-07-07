import { prisma } from "../../lib/prisma";
import { ITechnician } from "./technician.interface";


const updateProfileIntoDB = async(userId: string, payload: ITechnician) => {
    const result = await prisma.technicianProfile.upsert({
        where: {
            userId: userId
        },
        update: payload,

        create: {
            ...payload,
            userId: userId
        }
    })

    return result
}

export const technicianService = {
    updateProfileIntoDB
}