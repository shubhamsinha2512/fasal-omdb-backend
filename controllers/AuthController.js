const User = require('../models/UserModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const {signToken, verifyToken} = require('../utils/JWTUtils.js')


exports.signup = catchAsync(async (req, res, next) => {
    // console.log('create one user')
    if(req.body){
        const newUser = await User.create(req.body)
        const token = signToken(newUser._id)

        res.status(200).json({
            status: 'success',
            token : token,
            data : {
                user : newUser
            }
        })
    }
})

exports.login = catchAsync(async (req, res, next) => {
    // console.log('create one user')
    if(req.body){
        const {email, password} = req.body;
        
        //1. check if email & pwd exist
        if(!email || !password){
            return next(new AppError("Please provide email & password", 400))
        }
        
        //2.check if user exists & pwd correct
        const user = await User.findOne({email : email}).select('+password');
        // console.log(user)

        if(!user || !(await user.correctPassword(password, user.password))){
            return next(new AppError("Incorrect email or password", 401))
        }

        //3. if ok, send token to client
        const token = signToken(user._id)

        res.status(200).json({
            status:'success',
            token: token
        })

    }
})

exports.protected = catchAsync(async (req, res, next) => {

    let token;
    //1.Checking if token present
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1];
        // console.log(token)
    }

    if(!token){
        return next(new AppError("You are not logged in", 401))
    }
    
    //2. Verify token
    let decoded = verifyToken(token)
    // console.log(decoded)

    //3.Check if user still exists
    const freshUser = await User.findById(decoded.id)
    // console.log(freshUser)
    if(!freshUser){
        return next(new AppError("User belonging to this token no longer exists", 401))
    }

    //adding user to request
    req.user = freshUser._id;

    next()
})