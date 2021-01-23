//required paclage 
const express = require('express');
const { get } = require('http');
const path = require('path');
const { rootCertificates } = require('tls');

const router = express.Router();


const shopController = require('../controllers/shop/shop');
const shopAuthentication = require('../controllers/shop/authentication');
const shopStaff = require('../controllers/shop/staff');


router.route('/')
      .get(shopController.getHome);
//login page show routing 
router.route('/login')
      .get(shopAuthentication.getLogin)
//login request routing
router.route('/dashboard')
      .post(shopAuthentication.postLogin)      

router.route('/createaccount')
    .get(shopAuthentication.getCreateAccount) 
    .post(shopAuthentication.postCreateAccount)     

//show company information

router.route('/companyinfo')
      .get(shopAuthentication.isAuthentic,shopController.getCompanyInfo)
      .post(shopAuthentication.isAuthentic,shopController.postCompanyInfo)


//save tax data
router.route('/savetax')
      .post(shopAuthentication.isAuthentic,shopController.postSaveTax)

 //show shop open and close hours
 
 router.route('/openinghours')
      .get(shopAuthentication.isAuthentic,shopController.getOpeningHours)

router.route('/savedate')
       .post(shopAuthentication.isAuthentic,shopController.saveNewDate)           


router.route('/workschedule')
      .get(shopAuthentication.isAuthentic,shopController.getWorkSchedule)  
      


router.route('/staffmember')
      .get(shopAuthentication.isAuthentic,shopStaff.getStaffMember)      
      

 // add new stuff
 router.route('/addstaffmember')
      .post(shopAuthentication.isAuthentic,shopStaff.addNewStaff)     
 
//delete employee data
router.route('/deleteemployee')
      .post(shopAuthentication.isAuthentic,shopStaff.delelteEmployee)      


//add service to employee
router.route('/addservicestaff')
      .post(shopAuthentication.isAuthentic,shopController.addServiceToEmployee)    

// /addstafftime
router.route('/addstafftime')
      .post(shopAuthentication.isAuthentic,shopController.getAddStaffTime)         
      
//appointment
router.route('/appointment')
      .get(shopAuthentication.isAuthentic,shopController.getAppointment);      

///saleshistory
router.route('/saleshistory')
      .get(shopAuthentication.isAuthentic,shopController.getSalesHistory);

///saleslist
router.route('/saleslist')
      .get(shopAuthentication.isAuthentic,shopController.getSalesList)
      .post(shopAuthentication.isAuthentic,shopController.postSalesList)

///invoicelist
router.route('/invoicelist')
      .get(shopAuthentication.isAuthentic,shopController.getInvoiceList)      

///invoicedetail
router.route('/invoicedetail')
      .get(shopAuthentication.isAuthentic,shopController.getInvoiceDetail)

///clientdetail      
router.route('/clientdetail')
      .get(shopAuthentication.isAuthentic,shopController.getClientDetail)
      .post(shopAuthentication.isAuthentic,shopController.postClientDetail)

///clientinvoice
router.route('/clientinvoice')
      .get(shopAuthentication.isAuthentic,shopController.getClientInvoice)
      

///categorieslist
router.route('/categorieslist')
      .get(shopAuthentication.isAuthentic,shopController.getCategoriesList)
      .post(shopAuthentication.isAuthentic,shopController.postCategoriesList)

///health&safety    
router.route('/health&safety')
      .get(shopAuthentication.isAuthentic,shopController.getHealthSafety)
      .post(shopAuthentication.isAuthentic,shopController.postHealthSafety)



///package     
router.route('/package')
      .get(shopAuthentication.isAuthentic,shopController.getPackage) 
      .post(shopAuthentication.isAuthentic,shopController.postPackage) 

///packagedetail 
router.route('/packagedetail')
      .get(shopAuthentication.isAuthentic,shopController.getPackageDetail) 

//show package orders 
router.route('/packageOrders')
      .get(shopAuthentication.isAuthentic,shopController.getPackageOrders)      

//package order approve      
router.route('/approve/package/:id')
      .get(shopAuthentication.isAuthentic,shopController.getApprovePackage)    

//package order delete
router.route('/delete/package/:id')   
      .get(shopAuthentication.isAuthentic,shopController.getDeletePackage)


//update pacakge data
router.route('/updatepackage')      
      .post(shopAuthentication.isAuthentic,shopController.postPackageUpdate)

///portfolio
router.route('/portfolio')
      .get(shopAuthentication.isAuthentic,shopController.getPortfolio) 
      .post(shopAuthentication.isAuthentic,shopController.postPortfolio)

//delete portfolio image
router.route('/portfolio/deleteimg/:img')
      .get(shopAuthentication.isAuthentic,shopController.getDeletePortfolioImg)      


///productscart    
router.route('/productscart')
      .get(shopAuthentication.isAuthentic,shopController.getProductsCart)    

///productsedit
router.route('/productsedit')
      .get(shopAuthentication.isAuthentic,shopController.getProductsEdit) 

///productsdetails
router.route('/productsdetails')
      .get(shopAuthentication.isAuthentic,shopController.getProductsDetails) 

///productsorders
router.route('/productsorders')
      .get(shopAuthentication.isAuthentic,shopController.getProductsOrders) 

///productscheckout
router.route('/productscheckout')
      .get(shopAuthentication.isAuthentic,shopController.getProductsCheckout)      

///bookingsetting
router.route('/bookingsetting')
      .get(shopAuthentication.isAuthentic,shopController.getBookingSetting)      

///staffcommission     
router.route('/staffcommission')
      .get(shopAuthentication.isAuthentic,shopController.getStaffCommission)   

// inventory
router.route('/inventory')
      .get(shopAuthentication.isAuthentic,shopController.getInventory)      

///reviewandrating
router.route('/reviewandrating')
      .get(shopAuthentication.isAuthentic,shopController.getReviewandRating)      

///reports
router.route('/reports')
      .get(shopAuthentication.isAuthentic,shopController.getReports) 

///processed
router.route('/processed')
      .post(shopAuthentication.isAuthentic,shopController.postProcessed)       

///deletepackage
router.route('/deletepackage')
      .post(shopAuthentication.isAuthentic,shopController.postDeletePackage) 
      

//add new services
router.route('/addservices')    
      .get(shopAuthentication.isAuthentic,shopController.getAddServices)
      .post(shopAuthentication.isAuthentic,shopController.postAddServices)

router.route('/deleteservice/:name')
      .get(shopAuthentication.isAuthentic,shopController.getDeleteServices)      
///logout
router.route('/logout')
      .get(shopAuthentication.isAuthentic,shopAuthentication.getLogout)       
 //export
module.exports = router;     





