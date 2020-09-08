const path = require('path');
const express = require('express'); 
const adminData = require('./admin');
const products = require('../controllers/products');

const router = express.Router();

router.get('/',products.getIndex); 

router.get('/products',products.getShop); 

router.get('/cart',products.getCart); 

router.get('/checkout',products.getCheckout); 

router.get('/products/:productId',products.getProducts);


module.exports = router;