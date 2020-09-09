const express = require('express');    
const bodyParser = require('body-parser');  
const path = require('path'); 
const sequelize = require('./database'); 
const session = require('express-session');  
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();


const adminRouter = require('./directories/admin');  
const shopRouter = require('./directories/shop'); 
const authRouter = require('./directories/auth');
const Product = require('./model/product');
const User = require('./model/user');   

var options = {
    host: 'localhost',
    user: 'root',
    password: 'imagerepository',
    database: 'img_repo', 
    createDatabaseTable: true, 
};


const app = express();   
var sessionStore = new MySQLStore(options);
app.set('view engine', 'pug');
app.set('views', 'frontend'); 


app.use(bodyParser.urlencoded({extended: false})); 
app.use(express.static(path.join(__dirname, 'css'))); 
app.use(session({secret: 'secret', resave: false, saveUninitialized: false, store: sessionStore}))

app.use('/admin',adminRouter.routes);  
app.use(shopRouter);  
app.use(authRouter);

app.use((req,res,next) => { 
    res.status(404).sendFile(path.join(__dirname,"frontend","invalid.html"));
});  

Product.belongsTo(User,{constraints: true, onDelete: 'CASCADE'});

sequelize.sync().then(() => {app.listen(process.env.PORT || 3000);}).catch(err => {console.log(err)});


