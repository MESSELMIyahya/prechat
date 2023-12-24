import { Response , Request  , NextFunction } from "express";
import UserModel from "../../../models/user";
import createErr from 'http-errors';

type FnTyp = (req:Request,res:Response,next:NextFunction) => Promise<any>;

// register new user 

const AuthRegisterController : FnTyp  =  async(req,res,next) => {
    const {name,username,password,email} = req.body ;
    if(!name||!username||!password||!email) return next(createErr.BadRequest('body data not provided'));
    try{
        // see if this email is existed
        // @ts-ignore
        const existedEmail = await UserModel.doesEmailExists(email);
        
        if(existedEmail) return next(createErr.Conflict(`email is already token`));

        // create user 
        const User = new UserModel({ email,name,userName:username,password });
        // saving the user 
        const saved = await User.save();

        // saved._id

        // return 
        return res.status(201).json({message:'user was created successfully',data:{email:email,id:saved._id}});
    }catch(err){
        return next(err)
    }
}



export default AuthRegisterController; 