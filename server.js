import express from 'express';
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
import connectToMongoDB from './db/connecttoMongoDB.js';
import cookieParser from 'cookie-parser';
const app =express();
const PORT = process.env.PORT || 8000;
dotenv.config();


app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);


app.get('/',(req,res)=>{
    res.send('Server is running');
})



app.listen(PORT,()=>{
    connectToMongoDB();
console.log(`Server is running at port ${PORT}`)

});

