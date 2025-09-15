import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

function setUser(user){
    return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' });
}

function getUser(token){
    try {
        return jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
        return null; 
    }
}

export { setUser, getUser };
