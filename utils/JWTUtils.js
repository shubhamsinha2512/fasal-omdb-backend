const jwt = require('jsonwebtoken')

const JWT_EXPIRES = '30d';
const JWT_SECRET = 'myjwtsecret123';

exports.signToken = id => {
    return jwt.sign({id: id}, process.env.JWT_SECRET || JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES || JWT_EXPIRES})
}

exports.verifyToken = token => {
    return jwt.verify(token, process.env.JWT_SECRET || JWT_SECRET)
}