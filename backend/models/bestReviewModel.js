import mongoose from 'mongoose';


const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        
    },
    review:{
        type: String,
        
    },
    rating:{
        type: Number
    },
    image: {
        type: String,
    }

},{
    timestamps:true
})



const Review = mongoose.model('Review',reviewSchema)

export default Review;