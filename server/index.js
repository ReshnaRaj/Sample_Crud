const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')

// app.use(
//     cors({
//       origin:'https://localhost:3000',
//       method: ["GET", "POST", "DELETE", "PUT"],
//       credentials: true,
//     })
//   );
app.use(cors())
app.use(express.json())
const schemaData=mongoose.Schema({
    name:String,
    email:String,
    mobile:Number,

},{timestamps:true})
const userModel=mongoose.model("user",schemaData)
 
// read the data of user
app.get('/',async(req,res)=>{
    const data=await userModel.find({})
    res.json({success:true,data:data})
})
// create the new user data
app.post('/create',async(req,res)=>{
    const data=new userModel(req.body)
     await data.save()
    res.send({success:true,message:"data created successfully",data:data})
    console.log(req.body)
})

// update the data
app.put('/update',async(req,res)=>{
    console.log(req.body)
    const {_id,...rest}=req.body
    console.log(rest,"data")
    const data=await userModel.updateOne({_id:_id},rest)
    res.send({success:true,message:"updated successfully",data:data})
})

// delete the data
app.delete('/delete/:id',async(req,res)=>{
    console.log(req.params.id,"id of the user")
    const id=req.params.id
    console.log(id)
    const data=await userModel.deleteOne({_id:id})
    res.send({success:true,message:"deleted successfully",data:data})

})

mongoose.connect("mongodb://127.0.0.1:27017/crudoperations")
.then(()=>{console.log("connected to db")
app.listen(4001,()=>{
    console.log("server connected at port 4001")
})
})

.catch((error)=>console.log(error))
