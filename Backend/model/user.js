const mongoose=require("mongoose")


let Userschema=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    confirmPassword:{type:String}
})
const User=mongoose.model("Users",Userschema)

module.exports=User;


