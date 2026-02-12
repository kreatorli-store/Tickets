import { Router, Request, Response } from "express";
import User from "../models/user";
import { omit } from "lodash";
import jwt from "jsonwebtoken";

const route = Router();

route.post("/api/users/signup", async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);

    // ✅ create JWT
    const userJwt = jwt.sign(
      {
        userId: user.id,   // keep this key same as tickets expects (userId)
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // ✅ store in session cookie
    req.session = {
      jwt: userJwt,
    };

    return res.status(201).send(omit(user.toObject(), "password"));
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
});

export { route as signupRouter };
