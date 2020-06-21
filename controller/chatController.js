var express = require("express");
var app = express();
var body = require("body-parser");
var path = require("path")
app.use(body.urlencoded({ extended: false }))
const socket=require('socket.io')
const router=express.Router()
const authcheck=(req,res,next)=>{
    console.log(excesstoken,"hhhh");
    try {
        if(excesstoken){
            next();
        }
        else{
            res.redirect('/')
        }
    } catch (error) {
        console.log(error);
        
    }
}


router.get('/chat',authcheck,(req,res)=>{
    res.render('chat')

})

const excesstoken=localStorage.getItem('excesstoken')
module.exports=router
