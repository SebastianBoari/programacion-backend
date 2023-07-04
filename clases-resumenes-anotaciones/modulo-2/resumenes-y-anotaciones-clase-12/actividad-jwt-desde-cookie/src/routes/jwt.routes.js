import { Router } from "express";
import { generateToken, authToken } from "../utils.js";

const router = Router();

const users = [
    { email: "coder@gmail.com", password: "coder123" }

];

router.post("/register", (req, res) => {
    const user = req.body
    if(users.find(item => item.email === user.email)){
        return res.status(400).json({ status: "error", error: "User already exists" });
    };

    users.push(user)
    
    const access_token = generateToken(user);

    res.json({ status: "success", access_token});
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(item => item.email === email && item.password === password);

    if(!user) return res.status(400).json({ status: "error", error: "Invalid credentials"})

    const access_token = generateToken(user);

    // Esta es la opcion mas peligrosa, responder con el token
    //res.json({ status: "success", access_token });

    
    res.cookie("miecommerce", access_token, {
        httpOnly: true
    }).json({ status: "success" })
});

router.get("/private", authToken, (req, res) => {
    res.json({ status: "OK, estas dentro!" });
});

export default router;