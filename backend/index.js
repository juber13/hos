import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import connectDB from './db/connectDB.js';
const app = express();

dotenv.config({ path: './.env' })

connectDB();
app.use(cors({
    origin: [],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// imports routes
import userRouter from './routes/user.route.js'

app.use('/api/v1', userRouter)

app.listen(process.env.PORT || 1000, () => {
    console.log(`Server is running at port ${process.env.PORT}`)
})




