import Express from 'express';
import Dotenv from 'dotenv';
import Cors from 'cors';
import connectToDB from './libs/db';
import ExpressCookies from 'express-cookie';
import ErrorControllerHandler from './controllers/errorHandler';

// dotenv config 
Dotenv.config();


// express app 
const app = Express();

// express config
app.use(Express.urlencoded({extended:true}));
app.use(ExpressCookies());
app.use(Express.json());

// CORS config 
app.use(Cors());



// routes

// test route
app.get('/',async(req,res,next)=>{
    const createError = await import('http-errors')
  return next(createError[500]('body not found'));
})



// Error Handler 
app.use(ErrorControllerHandler);


// connect to mongodb
connectToDB();




// listening for server on prot 5000
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server running on http//localhost:${PORT}`);

})
