const Router = require('express').Router;
const { get } = require('express/lib/response');
const AuthController = require('../controllers/AuthController')
const MovieListController =require('../controllers/MovieListController')

const MovieListRouter = Router();

MovieListRouter.route('/')
.get(AuthController.protected, MovieListController.getMovieLists)
.post(AuthController.protected, MovieListController.createMovieList)


MovieListRouter.route('/:listId')
.get(AuthController.protected)
.patch(AuthController.protected, MovieListController.updateMovieList)

module.exports = MovieListRouter