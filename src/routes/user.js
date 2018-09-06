mostTrustedconst router = require('express').Router();
var passport = require('passport');
var express = require('express');
var jwt = require('jsonwebtoken');
require('../config/passport')(passport);
passport.authenticate('jwt', { session: false});
const userController= require('../controllers/userController');
router.post('/signup',userController.signup);
router.get('/mostTrusted',userController.mostTrusted);
router.post('/userSignup',userController.userSignup);
router.post('/login',userController.login);
router.get('/users/:page', userController.users);
router.get('/listUser', userController.listUser);
router.get('/viewUser/:id',userController.viewUser);
router.post('/updateUser',userController.updateUser);
router.post('/changeStatus',userController.changeStatus);
router.delete('/deleteUser/:id',userController.deleteUser);
router.get('/dashboardStates',userController.dashboardStates);
router.get('/myProfle',userController.myProfle);
router.get('/getLoggedInUser',userController.getLoggedInUser);
router.post('/forgotPassword', userController.forgotPassword);
router.get('/resetPassword/:id', userController.resetPassword)
router.post('/updateNewPassword', userController.updateNewPassword);
router.post('/resdNotification', userController.resdNotification);
router.get('/verifyEmail/:id', userController.resdNotification);
router.get('/verifyUserEmail/:id', userController.verifyUserEmail);

module.exports = router;
