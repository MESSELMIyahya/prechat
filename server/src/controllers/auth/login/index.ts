import { NextFunction , Request , Response } from "express";
import UserModel from "../../../models/user";
import createErr from 'http-errors';
import { generateAccessToken, generateRefreshToken } from "../../../libs/jwt";


type FnTyp = (req:Request,res:Response,next:NextFunction) => Promise<any>;

// login user 

const AuthLoginController : FnTyp  =  async(req,res,next) => {
    const {password,email} = req.body
    if(!password||!email) return next(createErr.BadRequest('email/password is not provided'));
    try{
        // get user 
        const user = await UserModel.findOne({email});
        if(!user) return next(createErr[400]('Unauthenticated'));

        // verify password 
        // @ts-ignore
        const isValidPass = await user.isValidPassword(password);
        if(!isValidPass) return next(createErr[401]('password is not valid'));

        // jwt auth 
        const accessToken  = generateAccessToken({email:user.email,id:user._id,username:user.userName});
        const refreshToken = generateRefreshToken({email:user.email,id:user._id,username:user.userName});

        // saving Access Token and Refresh Token as HTTPOnly cookie
        res.cookie('ac_to',accessToken,{httpOnly:true});
        res.cookie('re_to',refreshToken,{httpOnly:true});

        // send tokens 
        return res.json({id:user._id,tokens:{acc:accessToken,ref:refreshToken}});
    }catch(err){
        return next(err)
    }

}


export default AuthLoginController;
