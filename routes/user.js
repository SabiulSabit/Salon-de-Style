//required paclage 
const express = require('express');
const path = require('path');

const router = express.Router();


const userController = require('../controllers/user/user');
const userAuthentication = require('../controllers/user/authentication');


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
      .post(userAuthentication.isAuthentic,userAuthentication.setLocals,userController.getCart)      

//Service
router.route('/service/:name/:catName/:price')
      .get(userAuthentication.isAuthentic,userAuthentication.setLocals,userController.getService)

//Check out     
router.route('/checkout')
      .post(userAuthentication.isAuthentic,userAuthentication.setLocals, userController.postCheckOut)

//Payment 
router.route('/payment')
      .get(userAuthentication.isAuthentic,userAuthentication.setLocals,userController.getPayment)  
      

//Profile   
router.route('/profile')
      .get(userAuthentication.setLocals,userAuthentication.isAuthentic,userController.getProfile)    
      
router.route('/updateprofile')
      .post(userAuthentication.isAuthentic,userAuthentication.setLocals,userController.updateProfile)     
      
 ///chnagepassword   
 router.route('/chnagepassword')
      .post(userAuthentication.isAuthentic,userAuthentication.setLocals,userController.chnagePassword)       

//report
router.route('/report/:shopmail')
      .post(userAuthentication.isAuthentic,userAuthentication.setLocals,userController.postReport)      
    
router.route('/order/package/:token')
      .post(userAuthentication.isAuthentic,userController.postOrderPackage)

//dashbord
router.route('/dashbord')
      .get(userAuthentication.isAuthentic,userAuthentication.setLocals,userController.getDashbord)

///egiftcard
router.route('/egiftcard')
      .get(userAuthentication.isAuthentic,userAuthentication.setLocals,userController.getEGiftCard)

////appointment
router.route('/appointment')
      .get(userAuthentication.isAuthentic,userAuthentication.setLocals,userController.getAppointment)
  
////review&favourites      
router.route('/review&favourites')
      .get(userAuthentication.isAuthentic,userAuthentication.setLocals,userController.getReviewFavourites)

//terms&services
router.route('/terms&services')
      .get(userAuthentication.isAuthentic,userAuthentication.setLocals,userController.getTermsServices)     

///privacy
router.route('/privacy')
      .get(userAuthentication.isAuthentic,userAuthentication.setLocals,userController.getPrivacy)    

///setReview      
router.route('/setReview')
      .post(userAuthentication.isAuthentic,userAuthentication.setLocals,userController.postReview)   

///delete/appoinment
router.route('/delete/appoinment')
      .post(userAuthentication.isAuthentic,userAuthentication.setLocals,userController.postDeleteAppoinment)


// /search
router.route('/search')
      .post(userAuthentication.setLocals,userController.postSearch)

///search/category/
router.route('/search/category/:name')
      .get(userAuthentication.setLocals,userController.getSearchByCategory)     
          

///logout
router.route('/logout')      
      .get(userAuthentication.getLogout);

 //export
module.exports = router;     





