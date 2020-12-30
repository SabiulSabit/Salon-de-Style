//required paclage 
const express = require('express');
const path = require('path');

const router = express.Router();


const userController = require('../controllers/user');


router.route('/')
      .get(userController.setLocals, userController.getHome);

 
//show shop info
router.route('/details/:name/:mail')
      .get(userController.isAuthentic1,userController.setLocals,userController.getShowShop);

//login 
router.route('/login')      
      .post(userController.setLocals,userController.postLogin);

//create account
router.route('/createaccount')
      .post(userController.setLocals,userController.postCreateAccount) 

///cart      
router.route('/cart')
      .post(userController.isAuthentic,userController.setLocals,userController.getCart)      

//Service
router.route('/service/:name/:catName/:price')
      .get(userController.isAuthentic,userController.setLocals,userController.setLocals,userController.getService)

//Check out     
router.route('/checkout')
      .post(userController.isAuthentic,userController.setLocals, userController.postCheckOut)

//Payment 
router.route('/payment')
      .get(userController.isAuthentic,userController.setLocals,userController.getPayment)  
      

//Profile   
router.route('/profile')
      .get(userController.setLocals,userController.isAuthentic,userController.getProfile)    
      
router.route('/updateprofile')
      .post(userController.isAuthentic,userController.setLocals,userController.updateProfile)     
      
 ///chnagepassword   
 router.route('/chnagepassword')
      .post(userController.isAuthentic,userController.setLocals,userController.chnagePassword)       

//report
router.route('/report/:shopmail')
      .post(userController.isAuthentic,userController.setLocals,userController.postReport)      
    
router.route('/order/package/:token')
      .post(userController.isAuthentic,userController.postOrderPackage)

//dashbord
router.route('/dashbord')
      .get(userController.isAuthentic,userController.setLocals,userController.getDashbord)

///egiftcard
router.route('/egiftcard')
      .get(userController.isAuthentic,userController.setLocals,userController.getEGiftCard)

////appointment
router.route('/appointment')
      .get(userController.isAuthentic,userController.setLocals,userController.getAppointment)
  
////review&favourites      
router.route('/review&favourites')
      .get(userController.isAuthentic,userController.setLocals,userController.getReviewFavourites)

//terms&services
router.route('/terms&services')
      .get(userController.isAuthentic,userController.setLocals,userController.getTermsServices)     

///privacy
router.route('/privacy')
      .get(userController.isAuthentic,userController.setLocals,userController.getPrivacy)    

///setReview      
router.route('/setReview')
      .post(userController.isAuthentic,userController.setLocals,userController.postReview)   

///delete/appoinment
router.route('/delete/appoinment')
      .post(userController.isAuthentic,userController.setLocals,userController.postDeleteAppoinment)


// /search
router.route('/search')
      .post(userController.setLocals,userController.postSearch)

///search/category/
router.route('/search/category/:name')
      .get(userController.setLocals,userController.getSearchByCategory)     
          

///logout
router.route('/logout')      
      .get(userController.getLogout);

 //export
module.exports = router;     





