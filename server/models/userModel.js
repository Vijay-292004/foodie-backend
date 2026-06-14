const mongoose=require('mongoose')

//user schema design
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:[true,"user name is required"]

    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        required:[true,"phone number is required"]
    },
    userType:{
        type:String,
        required:[true,"user type is required"],
        default:"client",
        enum:["client","admin","vendor",'driver']
    },
    profile:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    }
},{timestamps:true})
module.exports=mongoose.model("User",userSchema)