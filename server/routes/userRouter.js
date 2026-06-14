const express= require('express')
const {getUserController,updateUserController,resetPasswordController,updatePasswordController,deleteProfileController}=require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const router=express.Router()

//GEt User| Get
router.get('/getUser',authMiddleware, getUserController) 

router.put('/updateUser',authMiddleware, updateUserController)

//Update password | post
router.post('/updatePassword',authMiddleware,updatePasswordController)


//Reset password | post
router.post('/resetPassword',authMiddleware,resetPasswordController)

//delete user

router.delete('/deleteUser/:id',authMiddleware,deleteProfileController)

module.exports=router