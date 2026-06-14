const mongoose=require('mongoose')

//user schema design
const OrderSchema= new mongoose.Schema({
    food:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Foods"
    }],
    payments:{

    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:['Preparing','prepared','on the way','delivared'],
        default:"Preparing"

    }

},{timestamps:true})


module.exports=mongoose.model("Orders",OrderSchema)