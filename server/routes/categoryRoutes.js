const express= require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { createCategoryController, getAllController, updateCategoryController } = require('../controllers/categoryController')
const router=express.Router()

//routes

//create category

router.post('/create',authMiddleware,createCategoryController)

//get all category

router.get('/getall',getAllController)

//Update category

router.put('/updateCat',authMiddleware,updateCategoryController)


module.exports=router