import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { v4 as uuidv4 } from "uuid";
import routes from "./routes/index.ts";
import models from "./models/index.ts";
const app: Express = express();



app.use((req: Request, res: Response, next: NextFunction) => {
  req.body = {
    me: models.users[1],
    models,
  };
  next();
});
app.get("/", (req: Request, res: Response) => {
  return res.send({
    message: "Hello World!",
  });
});
app.use("/messages", routes.message);
app.use("/users", routes.user);
app.use("/auth", routes.auth);


app.listen(3000, () => {
  console.log("Listening on port 3000");
});
