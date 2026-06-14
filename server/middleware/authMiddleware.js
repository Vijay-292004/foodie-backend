const JWT = require("jsonwebtoken")

module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1]
        JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if (err){
                return res.status(401).send({
                    success:false,
                    message:"Un-Auth user"
                })
            }
            else{
                req.userId= decode.id
                next() 
            }
        })
    }
    catch(error){
        console.log("Error in auth middleware",error)
        res.status(500).send({
            success:false,
            message:"Error in auth middleware",
            error
        })
    }

}