const express=require('express')
const passport=require("passport")
const app=express.Router();
const pass=require('../confri/passportSetup')
const session=require('express-session')
app.use(session({
  cookie:{
      maxAge:1000*60*60*60*3,
      sameSite:true,
  },
  name:"sid",
  saveUninitialized:true,
  keys:"jisdoiahhidhhu"
}));


app.use(passport.initialize())
app.use(passport.session())
app.get('/google',passport.initialize(),
  passport.authenticate('google', { scope: ['profile','email'] }))
app.get("/google/redirect",passport.initialize(),passport.authenticate('google'),(req,res)=>{
  res.render('home',{user:req.user,sign:"logout"})
})
module.exports=app;