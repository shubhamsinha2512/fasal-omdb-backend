const mongoose = require('mongoose');


const MovieSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        required:[true, 'please provide user to add movie']
    }
},
{
    timestamps: true,
    strict : false
})

const Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie;