const mongoose=require('mongoose')

//user schema design
const categorySchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,"category title is required"]
    },
    imageUrl:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }
},{timestamps:true})


module.exports=mongoose.model("Category",categorySchema)