// Dependencies
import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import __dirname from "./utils.js";

// Imports
import productViewsRouter from "./routes/products.views.router.js";
import sessionRouter from "./routes/session.router.js";
import productRouter from "./routes/products.router.js";

// Express config
const port = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// Handlebars config
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// MongoDB config
const MONGO_URI = "mongodb://127.0.0.1:27017";
const MONGO_DB_NAME = "coder_project";

// Session config
app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URI,
        dbName: MONGO_DB_NAME
    }),
    secret: 'mysecret',
    resave: true,
    saveUninitialized: true
}));

app.use("/products", productViewsRouter)
app.use("/session", sessionRouter)
app.use("/api/products", productRouter)

mongoose.set("strictQuery");
try{
    await mongoose.connect(MONGO_URI, { dbName: MONGO_DB_NAME });
    app.listen(port, () => console.log(`Server up on port: ${port}`));
}catch(error){
    console.error(`Server error: ${error}`);
};