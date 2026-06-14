const testUserController = (req,res)=>{
    try{
        res.status(200).send({
            success:true,
            message:'Test API is working'
        })

    }catch(error){
        console.log('error in Test API',error

        )
    }
}

module.exports = {
    testUserController
}