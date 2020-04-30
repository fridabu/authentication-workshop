// use these functions to manipulate our database
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { findByUsername, addNewUser } = require('../models/users/User.model');

exports.loginPage = (req, res) => {
  res.render('login', { activePage: { login: true } });
};
exports.registerPage = (req, res) => {
  res.render('register', { activePage: { register: true }, error:'' });
};

// This function handles the POST /addUser route
// checks if the password and confirmPassword are equal if not send back 
// a proper error message
// hash the password, then add the new user to our database using the v addNewUser method
// make sure to handle any error that might occured
exports.addUser = (req, res, err) => {
  var username = req.body.username;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;
  if(username.length == 0 || password.length == 0 || confirmPassword.length ==0){
    res.render('register', { error: 'one of the fields is empty'});
    return;
  }
  if(password !== confirmPassword){
    //return new Error('Passwords not match');
    res.render('register', { error: 'Passwords not match'});
    return;
  }
  bcrypt.hash(password, saltRounds, function(err, hash) {
    if(err){
    res.render('register', { error: 'error in hashing'});
    return;
    }
    // Store hash in your password DB.
    addNewUser(username,hash).then ( () => {
      res.redirect('/');
    }).catch((e)=>{
      res.render('register',{error: e.message});
    });
});
  
};

// this function handles the POST /authenticate route
// it finds the user in our database by his username that he inputed
// then compares the password that he inputed with the one in the db
// using bcrypt and then redirects back to the home page 
// make sure to look at home.hbs file to be able to modify the home page when user is logged in
// also handle all possible errors that might occured by sending a message back to the cleint
exports.authenticate = (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  
  findByUsername(username)
  .then((user)=>{
    
    bcrypt.compare(password, user.password, function(err, result) {
      if(err){
        res.render('login',{error: err.message});
      }
      if(result == true){
        res.redirect('/');
      }else{
        res.render('login',{error: "username or password not corect"});
      }
  });
  }
  )
  .catch((e)=>{
    res.render('login',{error: e.message});
  });
};


exports.logout = (req, res) => {
  
}