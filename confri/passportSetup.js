const passport=require("passport")
const GoogleStrategy=require('passport-google-oauth20')
const user_database=require('../modules/databaseconnection')
const keys=require('./keys')
const bcrypt=require('bcryptjs')
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    user_database.findById(id).then((user)=>{
         done(null,user)
    })
})

passport.use( new GoogleStrategy({
    clientID: keys.clientID,
    clientSecret:keys.clientsecret,
    callbackURL:"http://localhost:3030/google/redirect"
}, (acesstoken,refreshtoken,profile,done)=>{

user_database.findOne({username:profile.displayName}).then((user)=>{
    if(user){
        return done(null,user)
    }
    if(!user){
        const haspassword=bcrypt.hashSync(profile.displayName+"@123")
        const userdata=new user_database({
            username:profile.displayName,
            email:profile.displayName+"@gmail.com",
            password:haspassword
        })
     //   console.log(haspassword);
        
        userdata.save((err,data)=>{
            if(err) throw err;
            else{
                console.log('user saved');
            }
            return done(null,data)
        })
    }
})

}
))