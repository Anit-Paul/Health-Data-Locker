import bcrypt from 'bcrypt';
import validator from 'validator';
import UserModel from '../models/User.js';

async function registerAPI(req,res){
    try{
        const {name,email,password}=req.body;
        if(!validator.isEmail(email)){
            return res.status(400).json({
                message:"please enter a valid email"
            })
        }
        const existUser=await UserModel.findOne({email})
        if(existUser){
            
            return res.status(400).json({
                message:"Another User already using this email"
            })
        }
        
        if(password.length<4 || password.length>4){
            return res.status(400).json({
                message:"password length must be in the range of 4-10"
            })
        }
        
        const hashedPassword=await bcrypt.hash(password,12);
        
        const user=new UserModel({name:name,email:email,password:hashedPassword});
        await user.save()
        return res.status(200).json({
            message:"user created successfully!"
        })
    }catch(err){
        return res.status(500).json({
            message:"Internal server error from registerAPI",
            error:err
        })
    }
}

export {registerAPI};