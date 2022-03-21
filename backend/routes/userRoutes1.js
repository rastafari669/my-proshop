import express from 'express';
const router = express.Router()
import {
    authUser,
    getUserProfile,
    registerUser,
    updatetUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updatetUser
    } from '../controllers/userController.js'
import {protect,admin} from '../middlware/authMiddleware.js'


router.route('/').post(registerUser).get(protect,admin,getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updatetUserProfile)
router
.route('/:id')
.delete(protect,admin,deleteUser)
.get(protect,admin,getUserById)
.put(protect,admin,updatetUser)

export default router;