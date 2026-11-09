import type { Models } from "../prisma/contract.d";
import type { Scalars } from "@prisma/orm-postgres/family-contract/types";

type PrismaUser = Scalars<Models.public_User>;

type AuthUser = Omit<PrismaUser, "pwd">;

type JwtUser = {
     
      id: number,
      email: string,
      name: string,
      role: PrismaUser.role,
      phone: string,
    
}

type LocalUser = {
    id: number
}

type ExpressUser = LocalUser | JwtUser

declare global {
  namespace Express {
    interface User extends ExpressUser {} 
  }
}