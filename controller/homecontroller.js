var express=require('express')

var router=express.Router();
const authcheck=(req,res,next)=>{
        var excesstoken=localStorage.getItem('excesstoken');
        console.log(excesstoken,"hhhh");
        
       try {
           if(req.session||excesstoken){
               res.render('home',{user:excesstoken,sign:'logout'})
           }
           else{
               next();
           }
       } catch (error) {
           console.log(error);
           
       }
    }

router.get("/",authcheck,(req,res)=>{
        res.render('home',{user:"welcome",sign:'signup'})
})


module.exports=router