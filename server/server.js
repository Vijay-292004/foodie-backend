const express=require('express')
const cors=require('cors')
const app=express()
const morgan=require('morgan')
const dotenv=require('dotenv')
const connectDb=require('./config/db')
//.env config
dotenv.config()

//database connection
connectDb()

//middleware
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//route
//url: http://localhost:8080

app.use('/api/v1/test',require('./routes/testroutes'))
app.use('/api/v1/auth',require('./routes/authRoutes'))
app.use('/api/v1/user',require('./routes/userRouter'))
app.use('/api/v1/restuarent',require('./routes/restuarentRoutes'))
app.use('/api/v1/category',require('./routes/categoryRoutes'))
app.use('/api/v1/food',require('./routes/foodRoutes'))


app.get('/',(req,res)=>{
    res.status(200).send('<h1>Welcome to Food Server APP</h1>')
})

//PORT
const PORT=process.env.PORT || 8080
 
//server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})