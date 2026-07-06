import { Role } from "../../../generated/prisma";

export interface RegisterUserPayload {
    name: string;    
    email: string;  
    password: string;
    role: Role; 
}