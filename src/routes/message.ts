import express, {Router, type Request, type Response, type NextFunction } from "express"
//import models from "../models/index.ts";
import {v4 as uuidv4} from "uuid";
const router = Router();

router.use(express.json())
router.use(express.urlencoded({extended: true}))


router.get("/", (req: Request, res: Response) => {
  return res.send(Object.values(req.body.models.messages));
});

router.get(
  "/:messageId",
  (req: Request<{ messageId: string }>, res: Response) => {
    return res.send(
      req.body.models.messages[parseInt(req.params.messageId)],
    );
  },
);



router.post("/messages", (req: Request, res: Response) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.body.me[id],
  };
  req.body.models.messages[id] = message;
  return res.send(message);
});

router.put(
  "/:messageId",
  (req: Request<{ messageId: string }>, res: Response) => {
    const { [req.params.messageId]: message, ...othermessages } =
      req.body.models.messages;

    if (req.body.me.id !== message.userId) {
      return res.send("Not authorized!");
    }
    message.text = req.body.text;
    req.body.models.messages[req.params.messageId] = message;
    return res.send(message);
  },
);

router.delete(
  "/:messageId",
  (req: Request<{ messageId: string }>, res: Response) => {
    const { [req.params.messageId]: message, ...othermessages } =
      req.body.models.messages;
    req.body.models.messages = othermessages;

    return res.send(message);
  },
);
export default router
