import "dotenv/config";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  type StrategyOptionsWithSecret,
} from "passport-jwt";
import passwordUtils from "./password.ts";
import { db } from "../prisma/db.ts";

const opts: StrategyOptionsWithSecret = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET || "n0tS3cur3@t0ll",
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "pwd",
    },
    async function verify(username, password, cb) {
      // Check if user exists from the email provided
      const user = await db.orm.public.User.where({ email: username }).first();
      if (!user)
        return cb(null, false, {
          message: "User does not exist, please register!",
        });
      // Verify the password
      const verified = await passwordUtils.verifyPassword(user.pwd, password);
      if (!verified)
        return cb(null, false, { message: "Password is incorrect!" });
      return cb(null, {
       id: user.id,
     
      });
    },
  ),
);

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    const user = await db.orm.public.User.where({ id: jwt_payload.id }).first();

    if (!user) return done(null, false, { message: "User was not found" });
    return done(null, {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
    });
  }),
);
