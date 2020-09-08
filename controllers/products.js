const aws = require('aws-sdk');
const Product = require('../model/product');
const fs = require('fs'); 


exports.addProduct = (req,res,next) => { 
    res.render('add-product', {pagetitle: "f", path: "/admin/add-product",   isAuthenticated: req.session.isLoggedIn});
}; 

exports.postAddProduct = (req,res,next) => {  
    const title = req.body.title; 
    const description = req.body.description; 
    const price = req.body.price;   
  
    aws.config.setPromisesDependency();
    aws.config.update({
      accessKeyId: process.env.ACCESSKEYID,
      secretAccessKey: process.env.SECRETACCESSKEY, 
      region: process.env.REGION
    }); 
  
    const s3 = new aws.S3(); 
  
    var params = {
        ACL: 'public-read',
        Bucket: process.env.BUCKET_NAME,
        Body: file.buffer,
        Key: `images/${req.file.originalname}`, 
        ContentType: file.mimetype,
      };  

      s3.upload(params).promise().then(data => { 
        if (!data) {
            const locationUrl = data.Location;  
            return  Product.create({ 
                title: title, 
                price: price, 
                imageUrl: locationUrl, 
                description: description, 
                uploader: req.session.userid

            })
            
        }
      }).then(() => { res.redirect('/');}).catch(err => {console.log(err)});
};

exports.getShop = (req,res,next) => { 
    Product.fetchAll((products) => { 
        res.render('shop', {prods: products, path: '/',pagetitle: 'shop',   isAuthenticated: req.session.isLoggedIn});
    });
      
    };

exports.getIndex = (req,res,next) => {   

    Product.findAll().then((products) => { 
        res.render('index', {prods: products, path: '/',pagetitle: 'shop',   isAuthenticated: req.session.isLoggedIn});
    }).catch(err => console.log(err));

   
      
};

exports.getCart = (req,res,next) => { 
    res.render('cart', { 
        path: '/cart', 
        pagetitle: 'Your Cart', 
        isAuthenticated: req.session.isLoggedIn
    });
}; 

exports.getCheckout = (req,res,next) => { 
    res.render('checkout', { 
        path: '/checkout', 
        pagetitle: 'Checkout', 
        isAuthenticated: req.session.isLoggedIn
    });
}

exports.getProducts = (req,res,next) => { 
    Product.fetchAll((products) => { 
        res.render('products', {prods: products, path: '/',pagetitle: 'shop',  isAuthenticated: req.session.isLoggedIn});
    });
} 

exports.adminProducts =(req,res,next) => { 
    Product.findAll().then((products) => { 
        res.render('admin', {prods: products, path: '/admin/products',pagetitle: 'admin',   isAuthenticated: req.session.isLoggedIn});
    }).catch(err => console.log(err));
}

exports.getProduct = (req,res,next) => {  
    const prodId = req.params.productId;
    Product.findById(prodId, product => { 

    }); 
    res.redirect('/');
}

exports.postDeleteProduct = (req,res,next) => { 
    const prodId = req.body.productId; 
    Product.findByPk(prodId).then(product => { 
        return product.destroy();
    }).then(result => { 
        res.redirect('/admin/products');
    }).catch(err => console.log(err));
}

