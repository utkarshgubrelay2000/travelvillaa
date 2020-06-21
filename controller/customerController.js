const express=require('express')
const router=express.Router();
const tripdatabase=require('../modules/tripdatabse')
var excesstoken=localStorage.getItem('excesstoken');
const authcheck=(req,res,next)=>{
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

router.get('/travel',authcheck,(req,res)=>{
    res.render('travelwithus',{user:excesstoken})
})
router.post('/planning',(req,res)=>{
 const customerDetails=new tripdatabase(
     {
         user:req.body.user,
         person:req.body.person,
         date:req.body.date,
         place:req.body.place
        }
        )
        customerDetails.save((err,data)=>{
            if(err) throw err;
            else{
                console.log('saved');
                res.send('saved')
            }
        })
})
module.exports=router