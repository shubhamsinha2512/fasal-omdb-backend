const mongoose = require('mongoose');


const MovieListSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, "please provide user for movie list"]
    },
    listName:{
        type:String,
        required:[true, "please provie list name"]
    },
    movies:[{
        type:mongoose.Schema.ObjectId,
        ref: 'Movie'
    }]
},
{
    timestamps: true,
    strict : false
})

MovieListSchema.pre(/^find/, function(next){
    this.populate({
        path: 'movies',
        select:'-createdAt -updatedAt -__v'
    })

    next()
})

const MovieList = mongoose.model('MovieList', MovieListSchema)

module.exports = MovieList;