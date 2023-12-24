import {Socket} from 'socket.io'
import createErr from 'http-errors';
import { JWTPayloadTyp, verifyAccessToken } from "../../../libs/jwt";
import { ExtendedError } from 'socket.io/dist/namespace';
import cookie from 'cookie'

interface SocketTyp extends Socket {
    user?:JWTPayloadTyp
}

type FnTyp = (socket:SocketTyp,next:(err?:ExtendedError)=>any) => Promise<any>;

// login user 

const AuthSocketVerifierMiddleware : FnTyp  =  async(socket,next) => {
    // verify if cookies exist 
    if(!socket.request.headers.cookie) return next(createErr[401]('Unauthenticated'));
    const cos = cookie.parse(socket.request.headers.cookie)as {ac_to?:string,re_to?:string}
    if(!cos?.ac_to||!cos?.re_to) return next(createErr[401]('Unauthenticated'));
    try{
        // verify access token 
        const payload = await verifyAccessToken(cos?.ac_to);
        // if the token isn't valid  it'll throw an error "JWT-EXPIRED"

        // ser the user in req 
        socket.user = payload ;
        return next();
    }catch(err){
        return next(err);
    }
}

export default AuthSocketVerifierMiddleware;