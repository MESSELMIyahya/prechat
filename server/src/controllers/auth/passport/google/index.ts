import { NextFunction , Request , Response } from "express";
import createErr from 'http-errors';
import UserModel from "../../../../models/user";
import { generateAccessToken, generateRefreshToken } from "../../../../libs/jwt";
import UserType from "../../../../types/user.type";

interface ReqTyp extends Request {
    user?:UserType
}

type FnTyp = (req:ReqTyp,res:Response,next:NextFunction) => Promise<any>;

// login user 

const OAuthGoogleLoginController : FnTyp  =  async(req,res,next) => {
    const userData = req.user ;
    if(!userData) return next(createErr[401]('Unauthenticated here :)'));
    try{
        // get user 
        const user = await UserModel.findOne({email:userData?.email});
        if(!user) return next(createErr[401]('Unauthenticated'));

        // jwt auth 
        const accessToken  = generateAccessToken({email:user.email,id:user._id,username:user.userName});
        const refreshToken = generateRefreshToken({email:user.email,id:user._id,username:user.userName});

        // saving Access Token and Refresh Token as HTTPOnly cookie
        res.cookie('ac_to',accessToken,{httpOnly:true});
        res.cookie('re_to',refreshToken,{httpOnly:true});

        // send tokens 
        return res.redirect(process.env.SERVER_URL);
    }catch(err){
        return next(err)
    }

}


export default OAuthGoogleLoginController;
