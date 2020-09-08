const User = require('../model/user');
exports.getLogin = (req,res,next) => { 
    res.render('login', { 
        path: '/login', 
        pagetitle: 'Login',  
        isAuthenticated: false
    });
}; 

exports.postLogin = (req,res,next) => {
    const username = req.body.username; 
    const password = req.body.password;
    User.findOne({
        where: {
          name: username
        } 
    }).then(user => { 
        if(!user){ 
            return res.redirect('/login');
        }
        if(user.password === password){  
            req.session.isLoggedIn = true; 
            req.session.userid = user.id;
            return req.session.save(err => { 
                console.log(err); 
                res.redirect('/');
            });
        }
        res.redirect('/login');
    })
}; 

exports.postLogout = (req,res,next) => { 
    req.session.destroy(err => { 
        console.log(err); 
        res.redirect('/');
    });
} 

exports.getSignUp = (req,res,next) => { 
    res.render('signup', { 
        path: '/signup', 
        pagetitle: 'signup',  
        isAuthenticated: false
    });
};  

exports.postSignUp = (req,res,next) => { 
    const username = req.body.username; 
    const  password = req.body.password; 
    const confirmpassword = req.body.confirmpassword;
    User.findOne({
        where: {
          name: username
        }
      }).then(users => { 
          if(users){ 
              return res.redirect('/signup');
          } 
         return User.create({ 
              name: username, 
              password: password
          }).then(() => { 
            res.redirect('/login');
        })
      }).catch(err => { 
          console.log(err);
      });
}