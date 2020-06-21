var express=require('express')
const user_databse=require('../modules/databaseconnection')
const bcrypt=require('bcryptjs')
var router=express.Router();
const excesstoken=localStorage.getItem('excesstoken');



router.get("/profile",(req,res)=>{
    res.render('profile',{user:excesstoken})
})
router.get("/profile/setpassword",(req,res)=>{
    res.render('setPassword',{user:excesstoken,notification:""})
    
    
})
router.post("/profile/setpassword",(req,res)=>{

    var oldPassword=req.body.oldpassword
    var newPassword=req.body.newpassword
    var confirmPassword=req.body.confirmpassword
    user_databse.findOne({username:excesstoken}).then(data=>{
       if(bcrypt.compareSync(oldPassword,data.password)){
            if(newPassword===confirmPassword){
                var haspassword=bcrypt.hashSync(newPassword)
          user_databse.findOneAndUpdate({username:data.username},{password:haspassword}).exec((err,data)=>{
              
              res.render('setPassword',{user:excesstoken,notification:"success"})
            })
        }
        else{
            res.render('setPassword',{user:excesstoken,notification:"confirm and new password don not match"})

            }
        }
        else{
            res.render('setPassword',{user:excesstoken,notification:"old password doesnot match"})
        
    }
})
        
})


module.exports=router