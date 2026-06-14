const foodModels = require("../models/foodModels")
const orderModel = require("../models/orderModel")
//create Food Api

const CreateFoodController=async(req,res)=>{
    try{
        const{title,discription,price,imageUrl,foodTags,category,code,isAvailable,restuarent,rating}=req.body
        //validation
        if(!title || !discription || !price || !restuarent){
            return res.status(500).send({
                success:false,
                message:"please Provide All Fields"
            })
        }
       const newFood= new foodModels({title,discription,price,imageUrl,foodTags,category,code,isAvailable,restuarent,rating})
       await newFood.save()
       res.status(201).send({
        success:true,
        meassage:"New Food Item is Created",
        newFood
       })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in creating Food Api"
        })
    }

}


//get all food api

const getFoodController=async(req,res)=>{
    try{
        const foods=await foodModels.find({})
        if (!foods){
            return res.status(404).send({
                success:false,
                message:"no food Items was found"
            })
        }
        res.status(200).send({
            success:true,
            totalFood:foods.length,
            foods
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in get Food items Controller",
            error
        })
    }
}


//get By Id

const getByIdFoodController=async(req,res)=>{
    try{
        const foodId=req.params.id 
        if (!foodId){
            return res.status(404).send({
                success:true,
                message:"please provide Id"
            })
        }
        
        const food=await foodModels.findById(foodId)
        if(!food){
            return res.status(404).send({
                success:false,
                message:"No food is provide by this Id",
            })
        }
        res.status(200).send({
            success:true,
            food
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in food Get By Id controller",
            error
        })
    }
}


const getByResturentFoodController=async(req,res)=>{
    try{
        const restuarentId=req.params.id 
        if (!restuarentId){
            return res.status(404).send({
                success:true,
                message:"please provide restuarent Id"
            })
        }
        const food=await foodModels.find({restuarent:restuarentId})
        if(!restuarentId){
            return res.status(404).send({
                succes:false,
                message:"please provide Id",
            })
        }
        res.status(200).send({
            success:true,
            message:"Food basd on restuarent",
            food
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in food Get By Id controller",
            error
        })
    }
}


//update food

const updateFoodController=async(req,res)=>{
    try{
        const foodId=req.params.id
        if(!foodId){
            res.status(404).send({
                success:false,
                message:"no food id was found"
            })
        }
        const food=await foodModels.findById(foodId)
        if(!food){
            res.status(404).send({
                success:false,
                message:'No Food was Found'
            })
        }
        const {title,discription,price,imageUrl,foodTags,category,code,isAvailable,restuarent,rating}=req.body
        const updateFood=await foodModels.findByIdAndUpdate(foodId,{title,discription,price,imageUrl,foodTags,category,code,isAvailable,restuarent,rating},{new:true})
        res.status(200).send({
            success:true,
            message:'food item was updated',
            food
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in updatefood Api",
            error
        })
    }
}

//place order

const placeOrderController=async(req,res)=>{
    try{
        const {cart} =req.body
        if(!cart ){
            return res.status(500).send({
                success:false,
                message:'please provide the food cart or payment method'
            })
        }
        let total=0
        //calaculate
        cart.map((i)=>{
            total=total+i.price
        })

        const newOrder= new orderModel({
            food:cart,
            payments:total,
            buyer:req.body.userId
        })
        await newOrder.save()
        res.status(201).send({
            success:true,
            message:"Order Placed Succcesfully",
            newOrder
        })
    }
    catch(error){
        res.status(500).send({
            success:false,
            message:"Error in order place api",
            error
        })
    }
}

//Change orderSattus API

const orderStatus=async(req,res)=>{
    try{
        const orderid=req.params.id
        if(!orderid){
            return res.status(404).send({
                success:false,
                message:"Please provide valid orderID"
            })
        }
        const {status}=req.body
        const order=await orderModel.findByIdAndUpdate(orderid,{status},{new:true})
        res.status(200).send({
            success:true,
            message:"Order stats changed Succesfuuly",
            status
        })
    }
    catch(error){
        res.status(500).send({
            success:false,
            message:"Error in order status  api",
            error
        })
    }
}

module.exports={CreateFoodController,getFoodController,getByIdFoodController,getByResturentFoodController,updateFoodController,placeOrderController,orderStatus}