import "dotenv/config";
import express, {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import  "../utils/passport.ts"

const router = Router();

router.use(express.json());

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(403).json({ message: "Unauthorized!" });

    jwt.sign(
      { ...req.user },
      process.env.SECRET || "notSecureAtAll",
      { expiresIn: "6h" },
      (err, token) => {
        if (err) return next(err);

        return res.json({ token });
      },
    );
  },
);

router.get("/verify", passport.authenticate('jwt', {session: false}), async(req:Request, res:Response, next:NextFunction) => {
    return res.json(req.user)
})

export default router;

