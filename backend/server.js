import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js';
import userRoutes1 from './routes/userRoutes1.js';
import orderRoutes from './routes/orderRoutes.js';
import bestReviewsRoutes from './routes/bestReviewRoutes.js';
import morgan from 'morgan'
import uploadRoutes from './routes/uploadRoutes.js';
import {notFound,errorHandler} from './middlware/errorMiddleware.js';






dotenv.config();

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())




app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes1);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes);
app.use('/api/bestreviews',bestReviewsRoutes);

app.get('/api/config/paypal', (req,res) => 
res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads',express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'/frontend/build')))

    app.get('*',(req,res) => res.sendFile(path.resolve(__dirname, 'frontend',
    'build','index.html'))
    )
}

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))