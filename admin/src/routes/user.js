const router = require('express').Router();
var passport = require('passport');
var express = require('express');
var jwt = require('jsonwebtoken');
require('../config/passport')(passport);
passport.authenticate('jwt', { session: false});
const userController= require('../controllers/userController');
router.post('/signup',userController.signup);
router.post('/userSignup',userController.userSignup);
router.post('/login',userController.login);
router.get('/users/:page', userController.users);
router.post('/sortingUsers', userController.sortingUsers);
router.get('/listUser', userController.listUser);
router.get('/viewUser/:id',userController.viewUser);
router.get('/verifyEmail/:id', userController.verifyEmail);
router.get('/verifyUserEmail/:id', userController.verifyUserEmail);
//router.get('/viewPage/:id',pageController.viewPage);
router.post('/updateUser',userController.updateUser);
router.post('/changeStatus',userController.changeStatus);
router.delete('/deleteUser/:id',userController.deleteUser);
router.get('/dashboardStates',userController.dashboardStates);
router.get('/myProfle',userController.myProfle);
router.get('/getLoggedInUser',userController.getLoggedInUser);
router.post('/forgotPassword', userController.forgotPassword);
router.get('/resetPassword/:id', userController.resetPassword)
router.post('/updateNewPassword', userController.updateNewPassword);
router.post('/readNotification', userController.readNotification);
router.get('/frontNotification',userController.frontNotification);
router.get('/userTradeStates',userController.userTradeStates);
router.get('/mostTrustedUsers',userController.mostTrustedUsers);
router.post('/newTradeUserRating',userController.newTradeUserRating);
router.get('/activeUser',userController.activeUser);
router.post('/searchCity',userController.searchCity);
router.get('/userSubscription',userController.userSubscription);
router.get('/userSubscriptionAddon',userController.userSubscriptionAddon);
router.get('/getUserWishListProducts/:id',userController.getUserWishListProducts);
router.get('/getPublicProfile/:id',userController.getPublicProfile);


module.exports = router;