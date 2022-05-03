const express = require('express');
const morgan = require('morgan');
const compression = require('compression')
const cors = require('cors')

const AuthRouter = require('./routes/AuthRouter');
const MovieListRouter = require('./routes/MovieListRouter');

const app = express();
require('dotenv').config({path: './config.env'})

app.use(morgan('dev'))

app.use(express.json())
app.use(express.static(`${__dirname}/public`))
app.use(compression())


//allow cors
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
}))
app.options('*', cors())

app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();

    next()
})

app.use('/auth', AuthRouter)
app.use('/movielist', MovieListRouter)

//for unhandled request
app.use('*', (req, res, next)=>{
    const error = new Error(`Reuested URL ${req.originalUrl} cannot be found!`)
    error.statusCode = 404;
    error.status = 'fail';

    next(error)
})

module.exports = app;