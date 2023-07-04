import express from "express";
import UsersRouter from "./routes/users.routes.js";

const app = express(); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => console.log("Server Up"));

const usersRouter = new UsersRouter();
app.use("/users", usersRouter.getRouter());