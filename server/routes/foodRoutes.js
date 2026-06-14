const express= require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { CreateFoodController, getFoodController, getByIdFoodController, getByResturentFoodController, updateFoodController, placeOrderController, orderStatus } = require('../controllers/foodControllers')
const adminMiddleware = require('../middleware/adminMiddleware')
const router=express.Router()

//routes
//Create Food

router.post('/create',authMiddleware,CreateFoodController)

//Get All Foods

router.get('/getAll',getFoodController)

//get food by ID

router.get('/get/:id',getByIdFoodController)

//get food by ResturentID

router.get('/getByRestuarent/:id',getByResturentFoodController)

//updateFood

router.put('/update/:id',authMiddleware,updateFoodController)

//place order

router.post('/placeorder',authMiddleware,placeOrderController)


//Order staus

router.post('/orderStatus/:id',authMiddleware,adminMiddleware,orderStatus)

module.exports=router