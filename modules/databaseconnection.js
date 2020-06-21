const mongoose=require("mongoose");
const schema= mongoose.Schema;
const keys=require('../confri/keys')
const newScheme=new schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:String
});
// sytax in which the data should be entered for authentication
mongoose.connect(keys.mongodb,{useNewUrlParser:true,useUnifiedTopology:true})
const db=mongoose.connection;
db.on("error",()=>console.log('database didn"t connect'));

db.once("open",()=> console.log('connection made with databse'));
module.exports=mongoose.model("userdata",newScheme)
