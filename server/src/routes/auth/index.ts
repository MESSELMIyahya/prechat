import { Router } from 'express'
import AuthRegisterController from '../../controllers/auth/register';
import AuthLoginController from '../../controllers/auth/login';
import AuthNewAccessTokenController from '../../controllers/auth/newAccessToken';
import OAuthRouter from './passport';
import AuthLogoutController from '../../controllers/auth/logout';
import AuthIsAuthenticatedController from '../../controllers/auth/IsAuthenticated';


const app = Router();

// is authenticated route
app.get('/is-authenticated',AuthIsAuthenticatedController);

// register route 
app.post('/register',AuthRegisterController);

// login route 
app.post('/login',AuthLoginController);

// logout route 
app.delete('/logout',AuthLogoutController);

// generate new access token 
app.post('/new-access-token',AuthNewAccessTokenController);

// failed route 
app.get('/failed',(req,res)=>{
    return res.send('Try to login again later');
})

// OAuth 
app.use('/oauth',OAuthRouter);




const AuthRouter = app;
export default AuthRouter   ;

