const express= require('express')
const {createRestuarentController,getAllRestuarentsControllers, getRestuarentBtIdController, deleteRestuarentControllers}=require('../controllers/restuarentControllers')
const authMiddleware = require('../middleware/authMiddleware')
const router=express.Router()

//routers
//create restuarent | post
router.post('/create',authMiddleware,createRestuarentController)


//GET all resturents
router.get('/getAll',getAllRestuarentsControllers)


//get by id
router.get('/get/:id',getRestuarentBtIdController)


//delete restuarent
router.delete('/delete/:id',authMiddleware,deleteRestuarentControllers)

module.exports=router