import mongoose from 'mongoose';


const connectDB = async () =>{
    try {
        const conn = await mongoose.connect('mongodb+srv://joey789:joey789@cluster0.xha8k.mongodb.net/elecShop?retryWrites=true&w=majority',{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex: true
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
         console.log(`Error : ${error.message}`.red.underline.bold);
         process.exit(1)
    }
}

export default connectDB