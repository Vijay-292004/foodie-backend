//create CAtegory

const categoryModel = require("../models/categoryModel")

const createCategoryController=async(req,res)=>{
    try{
        const {title,imageUrl} = req.body
        if(!title || imageUrl){
            return res.status(500).send({
                success:false,
                message:"Please provide title and imageUrl"
            })
        }
        const newCategory=new categoryModel({title,imageUrl})
        await newCategory.save()
        res.status(201).send({
            success:true,
            message:"category created",
            newCategory
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in category Api",
            error 
        })
    }
}


const getAllController=async(req,res)=>{
    try{
        const categories= await categoryModel.find({})
        if(!categories){
            return res.status(404).send({
                success:true,
                message:"No Categories Found"
            })
        }
        res.status(200).send({
            success:true,
            totalCat:categories.length,
            categories
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getAll category Api"
        })
    }
}


//update category API

const updateCategoryController=async(req,res)=>{
    try{
         const {id} = req.params;
         const {title,imageUrl}=req.body
         const updatedCategory=await categoryModel.findByIdAndUpdate(id,{title,imageUrl},{new:true})
         if(!updatedCategory){
            return res.status(404).send({
                success:false,
                message:'Category is Not Found'
            })
         }
         res.status(200).send({
            success:true,
            message:'Category Updated Succesfully'
         })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Update category Controlle Api",
            error
        })
    }
}

module.exports={createCategoryController,getAllController,updateCategoryController}