const User = require('../models/UserModel');
const MovieList = require('../models/MovieListModel')
const Movie = require('../models/MovieModel')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');


exports.createMovieList = catchAsync(async (req, res, next)=>{

    if(req.body){

        let listCreateObj = {
            user : req.user,
            listName : req.body.listName
        }

        let newList = await MovieList.create(listCreateObj);
       
        if(!Array.isArray(req.body.movies)){
            return next(new AppError("movies should be an array"), 400)
        }

        let moviesUserAdded = req.body.movies.map(movie => {
            return {
                ...movie,
                user: req.user
            }
        }) 

        let moviesAdded = await Movie.insertMany(moviesUserAdded);
        let moviesAddedId = moviesAdded.map(m => m._id)
        let newListUpdated = await MovieList.findByIdAndUpdate(newList._id, {$push: {'movies' : {$each: moviesAddedId}}}, {new:true});
        
        res.status(200).json({
            status:'success',
            data:{
                movieList: newListUpdated
            }
        })

    }else{
        next(new AppError('Please provide request body', 400))
    }
})


exports.getMovieLists = catchAsync(async (req, res, next)=>{

    const movieLists = await MovieList.find({user : req.user});
    console.log(movieLists)

    if(Array.isArray(movieLists)){

        res.status(200).json({
            status:'success',
            data:{
                movieLists: movieLists
            }
        })

    }else{
        next(new AppError('Cannot retrive movie lists'), 500)
    }
})


exports.updateMovieList = catchAsync(async (req, res, next)=>{

    if(req.body){

        let list = await MovieList.findById(req.params.listId);
        let moviesAddedId = []
       
        if(req.body.movies !== undefined){

            if(!Array.isArray(req.body.movies)){
                return next(new AppError("movies should be an array"), 400)
            }
            
            let moviesUserAdded = req.body.movies.map(movie => {
                return {
                    ...movie,
                    user: req.user
                }
            })

            let moviesAdded = await Movie.insertMany([...moviesUserAdded]);
            moviesAddedId = moviesAdded.map(m => m._id)
        }

        let {movies, ...otherFields} = req.body;
        let newListUpdated = await MovieList.findByIdAndUpdate(list._id, {...otherFields, $push: {'movies' : {$each: moviesAddedId}}}, {new:true});

        res.status(200).json({
            status:'success',
            data:{
                movieList: newListUpdated
            }
        })

    }else{
        next(new AppError('Please provide request body', 400))
    }
})
