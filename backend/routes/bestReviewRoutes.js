import express from 'express';
const router = express.Router()
import {
   getBestReviews
} from '../controllers/reviewController.js'


router.route('/').get(getBestReviews)



export default router;
