const mongoose = require('mongoose');


//function to connect to database with mongoose
const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.Mongo_URI)
        console.log(`Connected to database successfully ${mongoose.connection.host}`)
    }
    catch(error){
        console.log("Error connecting to database",error)
}
}

module.exports=connectDb