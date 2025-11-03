

exports.getLoginPage = (req,res)=>{
  res.render("login",{
    isLoggedIn : req.session.isLoggedIn , 
    pageTitle : "Login Page",
    currentPage:"login",
  })
}
exports.postLoginPage = (req,res)=>{
  // res.cookie('isLoggedIn',  true);
  
  req.session.isLoggedIn =  true;
  res.render("LoginSuccesfull" , {
    
    isLoggedIn : req.session.isLoggedIn , 
    pageTitle: "Logined Successfully",
    currentPage:"Login",
  }
  )
}

exports.postLogout = (req,res)=>{
  // res.cookie('isLoggedIn' , false);
  req.session.isLoggedIn = false;
  res.redirect("/login");
}