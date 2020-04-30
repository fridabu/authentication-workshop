exports.get = (req, res) => {
    cookies = req.cookies;
    console.log(cookies);
    if(cookies.access_token){
        res.render('home', { activePage: { home: true }, signedIn:true, username:cookies.access_token });
    }else{
        res.render('home', { activePage: { home: true }, signedIn:false });
    }
};