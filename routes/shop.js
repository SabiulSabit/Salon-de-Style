//required paclage 
const express = require('express');
const { get } = require('http');
const path = require('path');
const { rootCertificates } = require('tls');

const router = express.Router();


const shopController = require('../controllers/shop/shop');


router.route('/')
      .get(shopController.getHome);
//login page show routing 
router.route('/login')
      .get(shopController.getLogin)
//login request routing
router.route('/dashboard')
      .post(shopController.postLogin)      

router.route('/createaccount')
    .get(shopController.getCreateAccount) 
    .post(shopController.postCreateAccount)     

//show company information

router.route('/companyinfo')
      .get(shopController.isAuthentic,shopController.getCompanyInfo)
      .post(shopController.isAuthentic,shopController.postCompanyInfo)


//save tax data
router.route('/savetax')
      .post(shopController.isAuthentic,shopController.postSaveTax)

 //show shop open and close hours
 
 router.route('/openinghours')
      .get(shopController.isAuthentic,shopController.getOpeningHours)

router.route('/savedate')
       .post(shopController.isAuthentic,shopController.saveNewDate)           


router.route('/workschedule')
      .get(shopController.isAuthentic,shopController.getWorkSchedule)  
      


router.route('/staffmember')
      .get(shopController.isAuthentic,shopController.getStaffMember)      
      .post(shopController.isAuthentic,shopController.postStaffMember)
      

 // add new stuff
 router.route('/addstaffmember')
      .post(shopController.isAuthentic,shopController.addNewStaff)     
 
//delete employee data
router.route('/deleteemployee')
      .post(shopController.isAuthentic,shopController.delelteEmployee)      


//add service to employee
router.route('/addservicestaff')
      .post(shopController.isAuthentic,shopController.addServiceToEmployee)    

// /addstafftime
router.route('/addstafftime')
      .post(shopController.isAuthentic,shopController.getAddStaffTime)         
      
//appointment
router.route('/appointment')
      .get(shopController.isAuthentic,shopController.getAppointment);      

///saleshistory
router.route('/saleshistory')
      .get(shopController.isAuthentic,shopController.getSalesHistory);

///saleslist
router.route('/saleslist')
      .get(shopController.isAuthentic,shopController.getSalesList)
      .post(shopController.isAuthentic,shopController.postSalesList)

///invoicelist
router.route('/invoicelist')
      .get(shopController.isAuthentic,shopController.getInvoiceList)      

///invoicedetail
router.route('/invoicedetail')
      .get(shopController.isAuthentic,shopController.getInvoiceDetail)

///clientdetail      
router.route('/clientdetail')
      .get(shopController.isAuthentic,shopController.getClientDetail)
      .post(shopController.isAuthentic,shopController.postClientDetail)

///clientinvoice
router.route('/clientinvoice')
      .get(shopController.isAuthentic,shopController.getClientInvoice)
      

///categorieslist
router.route('/categorieslist')
      .get(shopController.isAuthentic,shopController.getCategoriesList)
      .post(shopController.isAuthentic,shopController.postCategoriesList)

///health&safety    
router.route('/health&safety')
      .get(shopController.isAuthentic,shopController.getHealthSafety)
      .post(shopController.isAuthentic,shopController.postHealthSafety)



///package     
router.route('/package')
      .get(shopController.isAuthentic,shopController.getPackage) 
      .post(shopController.isAuthentic,shopController.postPackage) 

///packagedetail 
router.route('/packagedetail')
      .get(shopController.isAuthentic,shopController.getPackageDetail) 

//show package orders 
router.route('/packageOrders')
      .get(shopController.isAuthentic,shopController.getPackageOrders)      

//package order approve      
router.route('/approve/package/:id')
      .get(shopController.isAuthentic,shopController.getApprovePackage)    

//package order delete
router.route('/delete/package/:id')   
      .get(shopController.isAuthentic,shopController.getDeletePackage)


//update pacakge data
router.route('/updatepackage')      
      .post(shopController.isAuthentic,shopController.postPackageUpdate)

///portfolio
router.route('/portfolio')
      .get(shopController.isAuthentic,shopController.getPortfolio) 
      .post(shopController.isAuthentic,shopController.postPortfolio)

//delete portfolio image
router.route('/portfolio/deleteimg/:img')
      .get(shopController.isAuthentic,shopController.getDeletePortfolioImg)      

///email
router.route('/email')
      .get(shopController.isAuthentic,shopController.getEmail) 

//emaildetail      
router.route('/emaildetail')
      .get(shopController.isAuthentic,shopController.getEmailDetail) 

///emailcompose    
router.route('/emailcompose')
      .get(shopController.isAuthentic,shopController.getEmailCompose)   

///productscart    
router.route('/productscart')
      .get(shopController.isAuthentic,shopController.getProductsCart)    

///productsedit
router.route('/productsedit')
      .get(shopController.isAuthentic,shopController.getProductsEdit) 

///productsdetails
router.route('/productsdetails')
      .get(shopController.isAuthentic,shopController.getProductsDetails) 

///productsorders
router.route('/productsorders')
      .get(shopController.isAuthentic,shopController.getProductsOrders) 

///productscheckout
router.route('/productscheckout')
      .get(shopController.isAuthentic,shopController.getProductsCheckout)      

///bookingsetting
router.route('/bookingsetting')
      .get(shopController.isAuthentic,shopController.getBookingSetting)      

///staffcommission     
router.route('/staffcommission')
      .get(shopController.isAuthentic,shopController.getStaffCommission)   

// inventory
router.route('/inventory')
      .get(shopController.isAuthentic,shopController.getInventory)      

///reviewandrating
router.route('/reviewandrating')
      .get(shopController.isAuthentic,shopController.getReviewandRating)      

///reports
router.route('/reports')
      .get(shopController.isAuthentic,shopController.getReports) 

///processed
router.route('/processed')
      .post(shopController.isAuthentic,shopController.postProcessed)       

///deletepackage
router.route('/deletepackage')
      .post(shopController.isAuthentic,shopController.postDeletePackage) 
      

//add new services
router.route('/addservices')    
      .get(shopController.isAuthentic,shopController.getAddServices)
      .post(shopController.isAuthentic,shopController.postAddServices)

router.route('/deleteservice/:name')
      .get(shopController.isAuthentic,shopController.getDeleteServices)      
///logout
router.route('/logout')
      .get(shopController.isAuthentic,shopController.getLogout)       
 //export
module.exports = router;     





