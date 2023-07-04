import jwt from "jsonwebtoken";
import passport from "passport";

// Esto debeeria ser una variable de entorno
export const PRIVATE_KEY = "c0d3r";

export const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "24h" });
    return token;
};

export const authToken = (req, res, next) => {
    const token = req.cookies["miecommerce"];

    if(!token) return res.status(401).json({error: "Not auth"});

    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if(error) return res.status(403).json({ error: "Not authorized"});
        req.user = credentials.user;
        next();
    });
};

// Creando un custom passportCall

// Crearemos una funcion que utilice la funcion authenticate de passport. Configuraremos la funcion raiz para poder controlar los errores, el usuario, pero sobre todo, los mensajes de informacion
export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function(err, user, info){
            
            if(err) return next(err);
            
            if(!user){
                return res.status(401).send({error: info.messages ? info.messages : info.toString()})
            };

            req.user = user;

            next();
        })(req, res, next);
    };
};

