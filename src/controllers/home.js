const jwt = require('jsonwebtoken');


exports.get = (req, res) => {
    if(res.locals.user){
        res.render('home', { activePage: { home: true }, signedIn:true, username:res.locals.user });
    }else{
        res.render('home', { activePage: { home: true }, signedIn:false });
    }
    
};