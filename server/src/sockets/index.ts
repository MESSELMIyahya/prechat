import {Server, Socket} from 'socket.io'
import AuthSocketVerifierMiddleware from './middlewares/auth'
import UserType from '../types/user.type';

// socket config 


interface SocketTyp extends Socket {
    user?:UserType
}


function SocketConfig(io:Server) {

    // ## middleware 

    // auth 
    io.use(AuthSocketVerifierMiddleware);
         
    
    // connection 

    io.on('connection',(socket:SocketTyp)=>{

        console.log('new user connected id: '+socket?.user.email);

    });
    
    // error handling 

    
    io.on('error', err => console.log('error'))
    io.on('connect_failed', err => console.log('connect_failed'))
    io.on('disconnect', err => console.log('disconnect id:'+err.id))

}




export default SocketConfig
