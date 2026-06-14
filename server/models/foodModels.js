const mongoose=require('mongoose')

//user schema design
const FoodSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Food Title is Required"]
    },
    discription:{
        type:String,
        required:[true,"food discription is Required"]
    },
    price:{
        type:Number,
        required:[true,'Price is Required']
    },
    imageUrl:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    foodTags:{
        type:String
    },
    category:{
        type:String
    },
    code:{
        type:String
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    restuarent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restuarent"
    },
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5
    },
    ratingCount:{
        type:String
    }

},{timestamps:true})


module.exports=mongoose.model("Foods",FoodSchema)