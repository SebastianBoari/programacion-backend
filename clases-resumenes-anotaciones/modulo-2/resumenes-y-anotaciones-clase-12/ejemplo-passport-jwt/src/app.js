import express from "express";
import jwtRouter from "./routes/jwt.routes.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./passport.config.js";


const app = express(); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));
app.use(cookieParser());

initializePassport()
app.use(passport.initialize());


app.use("/jwt", jwtRouter);

app.listen(8080, () => console.log("Server Up"));