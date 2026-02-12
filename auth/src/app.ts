import "express-async-errors";
import express from "express";
import cookieSession from "cookie-session";
import cors from "cors";
import morgan from "morgan";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express();
app.set("trust proxy", true);

app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("dev"));
app.use(express.json());

// ✅ THIS is what creates the "session" cookie
app.use(
  cookieSession({
    signed: false,
    secure: false, // must be false for localhost + Postman (http)
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

export { app };
