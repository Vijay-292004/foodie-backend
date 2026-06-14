//create Rstuarent
const restuarentModel = require('../models/restuarentModel')
const createRestuarentController=async(req,res)=>{
    try{ 
        const {title,ImageUrl,foods,time,pickup,delivery,isOpen,logourl,rating,ratingCount,code,coords} =req.body
        //validation
        if(!title || !coords){
            return res.status(500).send({
                success:false,
                message:"Please fill title and coordinates fields"
            })
        }
        const newRestuarent = new restuarentModel({title,ImageUrl,foods,time,pickup,delivery,isOpen,logourl,rating,ratingCount,code,coords})
        await newRestuarent.save()
        res.status(201).send({
            success:true, 
            message:"New Restuarent Created Succesfully"
        }) 
    }  
    catch(error){
        console.log("Error in create restuarent API controller", error);
        return res.status(500).send({
            success: false,
            message: "Error in create restuarent API controller",
            error
        })
    }
}

//get All restuarents

const getAllRestuarentsControllers = async(req,res)=>{
    try{
        const restuarent= await restuarentModel.find({})
        if(!restuarent){
            return res.status(404).send({
                success:false,
                message:'No Restuarent Available'
            })
        }
        res.status(200).send({
            success:true,
            totalCount:restuarent.length,
            restuarent
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Get all Restarents API",
            error
        })

    }
}

//get by id
const getRestuarentBtIdController=async(req,res)=>{
    try{
        const restuarentId=req.params.id 
        if(!restuarentId){
            return res.status(404).send({
                success:false,
                message:"Please Provide Restuarent Id"
            })
        }
        //find restuarent
        const restuarent = await restuarentModel.findById(restuarentId);
        if(!restuarent){
            return res.status(404).send({
                success:false,
                message:"no restuarent found"
            })
        }
        res.status(200).send({
            success:true,
            restuarent 
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Get Restuarent ID API',
            error
        })
    }
}

// delete restuarent

const deleteRestuarentControllers=async(req,res)=>{
    try{
        const restuarentId = req.params.id
        if(!restuarentId){
            return res.status(404).send({
                success:false,
                message: 'restuarent not found'
            })
        }
        await restuarentModel.findByIdAndDelete(restuarentId)
        res.status(200).send({
            success:true,
            message:"Restuarent deleted Succesfully"
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in deleterestuarent api",
            error
        })
    }
}

module.exports={createRestuarentController,getAllRestuarentsControllers,getRestuarentBtIdController,deleteRestuarentControllers} 