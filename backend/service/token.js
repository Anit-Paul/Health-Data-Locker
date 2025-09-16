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

function setRecord(recordID){
    return jwt.sign({recordID},process.env.SHARE_SECRET_KEY,{expiresIn:'24h'})
}
function getRecord(token){
    try{
        return jwt.verify(token,process.env.SHARE_SECRET_KEY)
    }catch(err){
        return null;
    }
}

export { setUser, getUser,setRecord,getRecord };
