//required paclage 
const express = require('express');
const { get } = require('http');
const path = require('path');
const { rootCertificates } = require('tls');

const router = express.Router();


const shopController = require('../controllers/shop/shop');
const shopAuthentication = require('../controllers/shop/authentication');
const shopStaff = require('../controllers/shop/staff');
const shopService = require('../controllers/shop/service');
const shopPackage = require('../controllers/shop/package');
const shopPortfolio = require('../controllers/shop/portfolio');
const shopClient = require('../controllers/shop/client');
const shopHealthSafety = require('../controllers/shop/healthSafety');
const shopSales = require('../controllers/shop/sales');
const shopTimeSchedule = require('../controllers/shop/timeSchedule');
const shopCategorie = require('../controllers/shop/categorie');



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
      .get(shopAuthentication.isAuthentic,shopTimeSchedule.getOpeningHours)

router.route('/savedate')
       .post(shopAuthentication.isAuthentic,shopTimeSchedule.saveNewDate)           


router.route('/staffmember')
      .get(shopAuthentication.isAuthentic,shopStaff.getStaffMember)      
      

 // add new stuff
 router.route('/addstaffmember')
      .post(shopAuthentication.isAuthentic,shopStaff.addNewStaff)     
 
//delete employee data
router.route('/deleteemployee')
      .post(shopAuthentication.isAuthentic,shopStaff.delelteEmployee)      


///saleshistory
router.route('/saleshistory')
      .get(shopAuthentication.isAuthentic,shopSales.getSalesHistory);

///saleslist
router.route('/saleslist')
      .get(shopAuthentication.isAuthentic,shopSales.getSalesList)
      .post(shopAuthentication.isAuthentic,shopSales.postSalesList)
 

///invoicedetail
router.route('/invoicedetail')
      .get(shopAuthentication.isAuthentic,shopController.getInvoiceDetail)

///clientdetail      
router.route('/clientdetail')
      .get(shopAuthentication.isAuthentic,shopClient.getClientDetail)
      .post(shopAuthentication.isAuthentic,shopClient.postClientDetail)

///clientinvoice
router.route('/clientlist')
      .get(shopAuthentication.isAuthentic,shopClient.getClientInvoice)
      

///categorieslist
router.route('/categorieslist')
      .get(shopAuthentication.isAuthentic,shopCategorie.getCategoriesList)
      .post(shopAuthentication.isAuthentic,shopCategorie.postCategoriesList)

///health&safety    
router.route('/health&safety')
      .get(shopAuthentication.isAuthentic,shopHealthSafety.getHealthSafety)
      .post(shopAuthentication.isAuthentic,shopHealthSafety.postHealthSafety)


///package     
router.route('/package')
      .get(shopAuthentication.isAuthentic,shopPackage.getPackage) 
      .post(shopAuthentication.isAuthentic,shopPackage.postPackage) 

///packagedetail 
router.route('/packagedetail')
      .get(shopAuthentication.isAuthentic,shopPackage.getPackageDetail) 

//show package orders 
router.route('/packageOrders')
      .get(shopAuthentication.isAuthentic,shopPackage.getPackageOrders)      

//package order approve      
router.route('/approve/package/:id')
      .get(shopAuthentication.isAuthentic,shopPackage.getApprovePackage)    

//package order delete
router.route('/delete/package/:id')   
      .get(shopAuthentication.isAuthentic,shopPackage.getDeletePackage)


//update pacakge data
router.route('/updatepackage')      
      .post(shopAuthentication.isAuthentic,shopPackage.postPackageUpdate)

///portfolio
router.route('/portfolio')
      .get(shopAuthentication.isAuthentic, shopPortfolio.getPortfolio) 
      .post(shopAuthentication.isAuthentic, shopPortfolio.postPortfolio)

//delete portfolio image
router.route('/portfolio/deleteimg/:img')
      .get(shopAuthentication.isAuthentic, shopPortfolio.getDeletePortfolioImg)      


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
      .post(shopAuthentication.isAuthentic,shopPackage.postDeletePackage) 
      

//add new services
router.route('/addservices')    
      .get(shopAuthentication.isAuthentic,shopService.getAddServices)
      .post(shopAuthentication.isAuthentic,shopService.postAddServices)

router.route('/deleteservice/:name')
      .get(shopAuthentication.isAuthentic,shopService.getDeleteServices)      
///logout
router.route('/logout')
      .get(shopAuthentication.isAuthentic,shopAuthentication.getLogout)       
 //export
module.exports = router;     





