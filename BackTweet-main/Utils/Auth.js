import jwt from 'jsonwebtoken'
import { env } from '../config.js'
import { createError } from '../error.js'


export const verifieToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) return next(createError(401, "Acces Denied"))

    jwt.verify(token, env.token, (err, user) => {
    if(err) {
        return next(createError(403, {message: "Token non valide !", error: err.message}))
    }
    req.user = user

    next();
    })
}


