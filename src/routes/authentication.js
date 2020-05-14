const express = require('express')
const Route = express.Router();

const auth = require('../controllers/authentication');

//router.post('/sign_in', userControllers.postSignIn);
//router.post('/sign_up', userControllers.postSignUp);

Route
    .post('/sign_in', auth.postSignIn)    
    .post('/sign_up', auth.postSignUp)
    //.post('/token', auth.token)
    
module.exports = Route;