import asyncHandler from 'express-async-handler';
import Review from '../models/bestReviewModel.js';


//@desc Fetch all best reviews
//@route GET /api/bestreviews
//access Public

const getBestReviews = asyncHandler( async (req,res) =>{
   
    const bestReviews = await Review.find({})

    res.json(bestReviews)

})


export{getBestReviews}