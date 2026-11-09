import * as z from "zod"


const User = z.object({
    email: z.email("Please enter a valid email!"),
    name: z.string().nonempty("Please enter a username"),
    pwd: z.string().min(12, "Password must be at least 12 characters long!"),
    phone: z.e164("Please enter a valid phone number!")
})

export default {
    User
}