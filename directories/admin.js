const express = require("express");  
const path = require("path");
const products = require("../controllers/products");  
const multer = require("multer"); 
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

const router = express.Router(); 


router.get('/add-product',products.addProduct); 

router.get('/products',products.adminProducts);

router.post('/add-product', upload.single('imageUrl'),products.postAddProduct);  

router.post('/delete-product',products.postDeleteProduct);



exports.routes = router; 

