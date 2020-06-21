const express=require('express')
const user_database=require('../modules/databaseconnection')
const router=express.Router();
const bcrypt=require('bcryptjs')
const passport=require("passport")
const pass=require('../confri/passportSetup')
const cookiesession=require('cookie-session')
router.use(cookiesession({
  cookie:{
      maxAge:1000*60*60*60*3,
      sameSite:true,
  },
  name:"sid",
  saveUninitialized:true,
  keys:"jisdoiahhidhhu",
  secret:"thisissession"
}));
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

router.get("/signup",(req,res)=>{
    res.render('signup',{welcome:"Sign Up",alert:"white"})
})

const authcheck=(req,res,next)=>{
    var excesstoken=localStorage.getItem('excesstoken');
    console.log(excesstoken,"hhhh");

    
   try {
       if(req.session.user||excesstoken){
           
           next();
       }
       else{

res.redirect('/signup')    }
   } catch (error) {
       console.log(error);
       
   }
}
router.post('/signup',(req,res)=>{
    const haspassword=bcrypt.hashSync(req.body.password)
    console.log(req.session);
    user_database.findOne({username:req.body.usrname}).then(data=>{
        if(!data){
            if(req.body.usrname||req.body.password)
    {

        const userdata=new user_database({
            username:req.body.usrname,
            email:req.body.email,
            password:haspassword
        })
        console.log(haspassword);
        
        userdata.save((err,data)=>{
            if(err) throw err;
            else{
                console.log('user saved');
            }
        })
    }
           const { userid }=req.session;
           req.session.user=req.body.usrname;
           localStorage.setItem('excesstoken',req.session.user)

           res.render('home',{user:req.session.user,sign:"logout"})
        }
        else
        res.render('signup',{welcome:"user already exits",alert:"red"})
    })
})
router.get("/login",(req,res)=>{
    res.render('login',{user:"LogIn"})
})
router.get("/profile",authcheck,(req,res)=>{
    res.redirect('/user/profile')
})
router.post("/login",(req,res)=>{
    user_database.findOne({username:req.body.username}).then((data)=>{
        
        if(data){
            
            if(bcrypt.compareSync(req.body.userpassword,data.password)){
                
                req.session.user=req.body.username
                localStorage.setItem('excesstoken',req.session.user)
                res.render('home',{user:req.session.user,sign:"logout"})
            }
            else{
            
                res.render("login", {user:' password wrong' })
            }
        }
        else{
            res.render("login", {user:"user not found "})
        }
    })
})
router.get("/logout",(req,res)=>{
    req.session=null
    localStorage.removeItem('excesstoken');
    
    res.redirect('/')
    
})

router.get('/facebook',(req,res)=>{
    res.send(`
    <h1>
    we have not added this feature yet
    <h2> 
    we are working on it
    </h2>
   </h1>
    `)
})
router.get('/Linkedin',(req,res)=>{
    res.send(`
    <h1>
    we have not added this feature yet
   </h1>
    `)
})


router.use(passport.initialize())
router.use(passport.session())
router.get('/google',passport.initialize(),
  passport.authenticate('google', { scope: ['profile','email'] }))
router.get("/google/redirect",passport.authenticate('google'),(req,res)=>{
    res.send("jhh")
})
module.exports=router;

module.exports=router

