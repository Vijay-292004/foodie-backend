const mongoose=require('mongoose')

//user schema design
const restuarentSchema= new mongoose.Schema({

    title:{
        type:String,
        required:[true,"restuarent name is required"]
    },
    ImageUrl:{
        type:String,
    },
    foods:{
        type:Array,
    },
    time:{
        type:String,
    },
    pickup:{
        type:Boolean,
        boolean:true
    },
    delivery:{
        type:Boolean,
        default:true
    },
    isOpen:{
        type:Boolean,
        default:true
    },
    logourl:{
        type:String,
    },
    rating:{
        type:Number,
        default:1,
        min:1,
        max:5
    },
    ratingCount:{
        type:String
    },
    code:{
        type:String
    },
    coords:{
        id:{type:String},
        latitude:{type:Number},
        longitude:{type:Number},
        latitudeDelta:{type:Number},
        longitudeDelta:{type:Number},
        address:{type:String},
        title:{type:String}   
    }


},{timestamps:true})


module.exports=mongoose.model("Restuarent",restuarentSchema)