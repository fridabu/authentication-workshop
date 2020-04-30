const jwt = require('jsonwebtoken');

exports.validateNewUser = (req ,res, next) => {
    cookies = req.cookies;
    if(!cookies.access_token){
        return next();
       // res.send('No cookies');
    }
    var decoded = jwt.verify(cookies.access_token, process.env.JWT_SECRET);
    if(!decoded){
        return next();
    }
    res.locals.user = decoded;

    next()
}