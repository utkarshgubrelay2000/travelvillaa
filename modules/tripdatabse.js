const mongoose=require("mongoose");
const schema= mongoose.Schema;
const keys=require('../confri/keys')
const newScheme=new schema({
    user:String,
person:Number,
date:String,
place:String
})
mongoose.connect(keys.mongodb,{useNewUrlParser:true,useUnifiedTopology:true})
const db=mongoose.connection;
// syntax for  data of user (trip details )
db.on("error",()=>console.log('database didn"t connect'));

db.once("open",()=> console.log('trip data connect'));
module.exports=mongoose.model("customer",newScheme)
