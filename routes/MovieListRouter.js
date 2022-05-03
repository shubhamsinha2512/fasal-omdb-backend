const Router = require('express').Router;
const { get } = require('express/lib/response');
const AuthController = require('../controllers/AuthController')

const MovieListRouter = Router();

MovieListRouter.route('/')
.get(AuthController.protected)
.post(AuthController.protected)


MovieListRouter.route('/:movieId')
.get(AuthController.protected)
.patch(AuthController.protected)

module.exports = MovieListRouter