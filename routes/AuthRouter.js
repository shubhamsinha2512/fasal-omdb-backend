const Router = require('express').Router;
const AuthController = require('../controllers/AuthController')

const AuthRouter = Router();

AuthRouter.route('/login')
.post(AuthController.login)


AuthRouter.route('/signup')
.post(AuthController.signup)

module.exports = AuthRouter