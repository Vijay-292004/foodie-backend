const express= require('express')
const {registerContoller,loginController}=require('../controllers/authControllers')
const router=express.Router()

//routers
//Register | post 
router.post('/register',registerContoller)
router.post('/login',loginController)
module.exports=router