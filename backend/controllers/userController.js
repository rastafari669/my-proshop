import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';


//@desc  Auth user & get token
//@route POST /api/users/login
//access Public

const authUser = asyncHandler( async (req,res) =>{
    const {email,password} = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            image: user.image,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
});


//@desc  Register a new user
//@route POST /api/users
//access Public

const registerUser = asyncHandler( async (req,res) =>{
    const {name,email,password,image} = req.body

    const userExists = await User.findOne({ email })

     if (userExists) {
         res.status(400)
         throw new Error('User already exists')
     }

     const user = await User.create({
         name,
         email,
         password,
         image: image ? image : '/images/avatar.png'
     })

     if (user) {
         res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            image: user.image,
            token: generateToken(user._id)
         })
     }else{
         res.status(400)
         throw new Error('Invalid user data!')
     }
});

//@desc  Get user profile
//@route GET /api/users/profile
//access Private

const getUserProfile = asyncHandler( async (req,res) =>{
    
const user = await User.findById(req.user._id)

if (user) {
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    })
    
}else{
    res.status(404)
    throw new Error('User not found')
}
});


//@desc  Get all users
//@route GET /api/users
//access Private Admin only

const getUsers = asyncHandler( async (req,res) =>{
    
    const users = await User.find({})
    res.json(users)
    
    
    });

//@desc  Get user by ID
//@route GET /api/users/:id
//access Private Admin only

const getUserById = asyncHandler( async (req,res) =>{
    
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.json(user) 
    }else{
        res.status(404)
        throw new Error('User not found') 
    }
});

//@desc  Update user 
//@route PUT /api/users/:id
//access Private admin only

const updatetUser = asyncHandler( async (req,res) =>{
    
    const user = await User.findById(req.params.id)
    
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin
    
        const updatedUser = await user.save()
    
        
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
            })
        
    }else{
        res.status(404)
        throw new Error('User not found')
    }
    });

//@desc  Delete user
//@route DELETE /api/users/:id
//access Private Admin only

const deleteUser = asyncHandler( async (req,res) =>{
    
    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove()
        res.json({message: 'User removed'})
    }else{
        res.status(404)
        throw new Error('User not found')
    }
    res.json(users)
    
    
    });


//@desc  Update user profile
//@route PUT /api/users/profile
//access Private

const updatetUserProfile = asyncHandler( async (req,res) =>{
    
const user = await User.findById(req.user._id)

if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
        user.password = req.body.password
    }
    user.image = req.body.image || user.image

    const updatedUser = await user.save()

    if (user) {
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            image: updatedUser.image,
            token: generateToken(updatedUser._id)
        })
    
}else{
    res.status(404)
    throw new Error('User not found')
}
}});

export {
    authUser,
     getUserProfile,
     registerUser,
     updatetUserProfile,
     getUsers,
     deleteUser,
     getUserById,
     updatetUser
    }