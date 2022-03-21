import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import reviews from './data/reviews.js';
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Review from './models/bestReviewModel.js'
import Order from './models/orderModel.js';
import connectDB from './config/db.js';



dotenv.config()

connectDB()

const importData = async () =>{
    try {
       await Order.deleteMany()
       await Product.deleteMany()
       await User.deleteMany()
       await Review.deleteMany()

      const createdUsers = await User.insertMany(users)

      const adminUser = createdUsers[0]._id

      const sampleProducts = products.map(product =>{
          return {...product, user: adminUser}
      });

      await Product.insertMany(sampleProducts)
      await Review.insertMany(reviews)

      console.log('Data imported'.green.inverse);
      process.exit()
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1)
    }
}



const destroyData = async () =>{
    try {
       await Order.deleteMany()
       await Product.deleteMany()
       await User.deleteMany()

    console.log('Data destroyed'.red.inverse);
      process.exit()
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1)
    }
}


if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}
