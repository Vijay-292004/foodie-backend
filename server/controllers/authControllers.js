//Register
const userModel=require('../models/userModel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const registerContoller=async (req,res)=>{
    try{
        const {username,email,password,phone,address,answer}=req.body
        //validation
        if (!username || !email || !password || !phone || !answer){
            return res.status(500).send({
                success:false,
                message:"Please fill all the fields"
            })
        }

    //check user Existed
    const existing=await userModel.findOne({ email })
        if(existing){
            return res.status(500).send({
                success:false,
                message:"Email already existed please login"
            })
        }
        //hASH password
        var salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password,salt)
   

    //create new user
    const user = await userModel.create({username,email,password:hashPassword,phone,address,answer})
    res.status(201).send({
        success:true,
        message:"User registered successfully",
        user
        
    })

    }
    catch(error){
        console.log("Error in register controller",error)
        res.status(500).send({
            success:false,
            message:"Error in register controller",
            error
        })
    }
}


//Login || Post

const loginController=async (req,res)=>{
    try{
        const {email,password} =req.body
        //validation
        if (!email || ! password){
            return res.status(500).send({
                success:false,
                message:"Please fill all the fields"
            })
        }
        //check user
        const user = await userModel.findOne({email})
        if (!user){
           return res.status(500).send({
                success:false,
                message:"User not found with this email and password"
            })
        }

        //check user password | compare password
        const isMatch= await bcrypt.compare(password,user.password)
        if (!isMatch){
            return res.status(500).send({
                success:false,
                message:"Invalid password"
            })
        }
        // token
        const token = await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})


        user.password=undefined
        res.status(200).send({
            success:true,
            message:"User logged in successfully",
            token,
            user
        })

    }
    catch(error){
        console.log("Error in login controller",error)
        res.status(500).send({
            success:false,
            message:"Error in login controller",
            error
        })
    }
}

module.exports={registerContoller,loginController}