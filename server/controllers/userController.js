const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
// get user info
const getUserController = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        // hide password
        user.password = undefined;

        res.status(200).send({
            success: true,
            message: "User info fetched successfully",
            user
        });

    } catch (error) {
        console.log("Error in get user API controller", error);
        return res.status(500).send({
            success: false,
            message: "Error in get user API controller",
            error
        });
    }
};

//update user info
const updateUserController =async(req,res)=>{
    try{
        //find user
        const user = await userModel.findById(req.userId);
        //validation
        if (!user){
            return res.status(404).send({
                success:false,
                message:"User not found"
            })
        }
        //update user
        const {username,address,phone}=req.body
        if (username){
            user.username = username;
        }
        if (address){
            user.address = address;
        }
        if (phone){
            user.phone = phone;
        }
        //save updated user
        await user.save();
        res.status(200).send({
            success: true,
            message: "User updated successfully",
            user
        });
    }
    catch(error){
        console.log("Error in update user API controller", error);
        return res.status(500).send({
            success: false,
            message: "Error in update user API controller",
            error
        });
    }
}


const updatePasswordController = async (req, res) => {
    try{
        const user= await userModel.findById(req.userId)
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found"
            })
        }
        //get data from user
        const {oldPassword,newPassword}=req.body
        //validation
        if (!oldPassword || !newPassword){
            return res.status(500).send({
                success:false,
                message:"Please fill old and new password fields"
            })
        }
        //check old password with new password
        const isMatch= await bcrypt.compare(oldPassword,user.password)
        if (!isMatch){
            return res.status(500).send({
                success:false,
                message:"Invalid oldpassword"
            })
        }
        //hASH password
            var salt = bcrypt.genSaltSync(10);
            const hashPassword = await bcrypt.hash(newPassword,salt)
            user.password = hashPassword
        
    }
    catch(error){
        console.log("Error in update password API controller", error);
        return res.status(500).send({
            success: false,
            message: "Error in update password API controller",
            error
        });
    }
}



const resetPasswordController = async (req, res) => {
    try{
        const {email,newPassword,answer}=req.body
        if (!email || !newPassword || !answer){
            return res.status(500).send({
                success:false,
                message:"Please fill all the fields"
            })
        }
        const user = await userModel.findOne({email,answer})
            if (!user){
                return res.status(404).send({
                    success:false,
                    message:"User not found with this email and answer"
                })
            }
            //hASH password
            var salt = bcrypt.genSaltSync(10);
            const hashPassword = await bcrypt.hash(newPassword,salt)
            user.password = hashPassword
            await user.save()
            res.status(200).send({
                success:true,
                message:"Password reset successfully"
            })
               

    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in reset password API controller",
            error
        })
    }  
}

const deleteProfileController =async(req,res)=>{
    try{
        const id=req.params.id
        await userModel.findByIdAndDelete(id)
        return res.status(200).send({
            success:true,
            message:"Your Account deleted successfully"
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in delete profile API controller",
            error
        })
    }
}

module.exports = { getUserController, updateUserController,resetPasswordController ,updatePasswordController,deleteProfileController};