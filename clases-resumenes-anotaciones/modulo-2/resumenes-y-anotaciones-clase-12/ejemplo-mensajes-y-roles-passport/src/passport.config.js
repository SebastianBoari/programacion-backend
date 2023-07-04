import passport from "passport";
import jwt, { ExtractJwt } from "passport-jwt";
import { PRIVATE_KEY } from "./utils.js";

const JWTStrategy = jwt.Strategy

const cookieExtractor = (req) => {
    const token = (req && req.cookies) ? req.cookies["miecommerce"] : null

    return token;
};

const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async(jwt_payload, done) => {
        try{
            return done(null, jwt_payload);
        } catch(err) {
            return done(err);
        };
    }))
};

export default initializePassport;