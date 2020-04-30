const jwt = require('jsonwebtoken');

exports.get = (req, res) => {
    
    cookies = req.cookies;
    console.log(cookies);
    if(cookies.access_token){
        var decoded = jwt.verify(cookies.access_token, process.env.JWT_SECRET);
        res.render('home', { activePage: { home: true }, signedIn:true, username:decoded });
    }else{
        res.render('home', { activePage: { home: true }, signedIn:false });
    }
};