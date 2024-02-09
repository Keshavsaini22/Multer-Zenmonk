const mongoose=require('mongoose')
 const ImageSchema=new mongoose.Schema({
    img:{type:String},
    imgs:{type:Array}
 })

 module.exports=mongoose.model("images",ImageSchema)