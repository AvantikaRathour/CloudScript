const mongoose=require('mongoose')
const {Schema}=mongoose;
const UserSchema=new mongoose.Schema({
 name:{
    type:String,
    requied:true
 },
 email:{
    type:String,
    requied:true,
    unique:true
 },
 password:{
    type:String,
    required:true,
    unique:true
 },
date:{
    type:Date,
    default:Date.now
}
})
const User=mongoose.model("User",UserSchema)
module.exports=User