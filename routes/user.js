//required paclage 
const express = require('express');
const path = require('path');

const router = express.Router();


const userController = require('../controllers/user/user');
const userAuthentication = require('../controllers/user/authentication');
const userProfile = require('../controllers/user/profile');
const userSearch = require('../controllers/user/search');
const userBooking = require('../controllers/user/booking');


router.route('/')
      .get(userAuthentication.setLocals, userController.getHome);

 
//show shop info
router.route('/details/:name/:mail')
      .get(userAuthentication.isAuthentic1,userAuthentication.setLocals,userController.getShowShop);

//login 
router.route('/login')      
      .post(userAuthentication.setLocals,userAuthentication.postLogin);

//create account
router.route('/createaccount')
      .post(userAuthentication.setLocals,userAuthentication.postCreateAccount) 

///cart      
router.route('/cart')
      .post(userAuthentication.isAuthentic,userAuthentication.setLocals,userBooking.getCart)      

//Service
router.route('/service/:name/:catName/:price')
      .get(userAuthentication.isAuthentic,userAuthentication.setLocals,userBooking.getService)

//Check out     
router.route('/checkout')
      .post(userAuthentication.isAuthentic,userAuthentication.setLocals, userBooking.postCheckOut)

//Payment 
router.route('/payment')
      .get(userAuthentication.isAuthentic,userAuthentication.setLocals,userProfile.getPayment)  
      

//Profile   
router.route('/profile')
      .get(userAuthentication.setLocals,userAuthentication.isAuthentic,userProfile.getProfile)    
      
router.route('/updateprofile')
      .post(userAuthentication.isAuthentic,userAuthentication.setLocals,userProfile.updateProfile)     
      
 ///chnagepassword   
 router.route('/chnagepassword')
      .post(userAuthentication.isAuthentic,userAuthentication.setLocals,userProfile.chnagePassword)       

//report
router.route('/report/:shopmail')
      .post(userAuthentication.isAuthentic,userAuthentication.setLocals,userController.postReport)      
    
router.route('/order/package/:token')
      .post(userAuthentication.isAuthentic,userBooking.postOrderPackage)


///egiftcard
router.route('/egiftcard')
      .get(userAuthentication.isAuthentic,userAuthentication.setLocals,userProfile.getEGiftCard)

////appointment
router.route('/appointment')
      .get(userAuthentication.isAuthentic,userAuthentication.setLocals,userProfile.getAppointment)
  
////review&favourites      
router.route('/review&favourites')
      .get(userAuthentication.isAuthentic,userAuthentication.setLocals,userProfile.getReviewFavourites)

//terms&services
router.route('/terms&services')
      .get(userAuthentication.isAuthentic,userAuthentication.setLocals,userProfile.getTermsServices)     

///privacy
router.route('/privacy')
      .get(userAuthentication.isAuthentic,userAuthentication.setLocals,userProfile.getPrivacy)    

///setReview      
router.route('/setReview')
      .post(userAuthentication.isAuthentic,userAuthentication.setLocals,userController.postReview)   

///delete/appoinment
router.route('/delete/appoinment')
      .post(userAuthentication.isAuthentic,userAuthentication.setLocals,userProfile.postDeleteAppoinment)


// /search
router.route('/search')
      .post(userAuthentication.setLocals,userSearch.postSearch)

///search/category/
router.route('/search/category/:name')
      .get(userAuthentication.setLocals,userSearch.getSearchByCategory)     
          

///logout
router.route('/logout')      
      .get(userAuthentication.getLogout);

 //export
module.exports = router;     





