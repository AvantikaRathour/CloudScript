const mongoose=require('mongoose')
const {Schema}=mongoose;
const NotesSchema=new mongoose.Schema({
   user:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'User'
   },
 title:{
    type:String,
    requied:true
 },
 description:{
    type:String,
    requied:true,
 },
 tag:{
    type:String,
    default:"General"
 },
date:{
    type:Date,
    default:Date.now
}
})
module.exports=mongoose.model("Notes",NotesSchema);