import express, {Router, type Request, type Response, type NextFunction} from "express"
import {db} from "../prisma/db.ts"
import * as z from "zod"
import validators from "../validators/user.ts"
import passwordUtils from "../utils/password.ts"

type User = z.infer<typeof validators.User>

// Initialize the router
const router = Router()

// Make user express put the json data i send in the req.body object
router.use(express.json())


router.post("/", async(req:Request, res:Response) =>{
    // validate the data sent
    const result = validators.User.safeParse(req.body)

    if(!result.success){
        return res.json(
          result.error
        )
    }
    // Get the validated data
    const userData:User = result.data

    // hash the damn password
    const passwordHash = await passwordUtils.hashPassword(userData.pwd)
    userData.pwd = passwordHash

    // Create the user now 
    const newUser = await db.orm.public.User.create({...userData})

    return res.status(201).json(newUser)


} )

export default router