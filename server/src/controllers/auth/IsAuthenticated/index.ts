import { Response,Request,NextFunction } from "express";
import { JWTPayloadTyp, verifyAccessToken, verifyRefreshToken } from "../../../libs/jwt";




type FnTyp = (req:Request,res:Response,next:NextFunction) => Promise<any>;

// login user 

const AuthIsAuthenticatedController  : FnTyp  =  async(req,res,next) => {
    // verify if cookies exist 
    const cos = req.cookies ;

    if(!cos?.ac_to||!cos?.re_to) return res.status(400).json({authenticated:false});
    try{
        // verify access token and refresh token
        await verifyRefreshToken(cos?.re_to) ;
        const payload = await verifyAccessToken(cos?.ac_to);
        console.log("payload here:",payload);
        return res.status(200).json({authenticated:true,user:payload})
    }catch(err){
        return res.status(400).json({authenticated:false})
    }
}

export default AuthIsAuthenticatedController ;