const mongoose=require('mongoose')

const AdminSchema=new mongoose.Schema({
    name:String,
    mail:String,
    password:String,
    number:String
})

const AdminModel=mongoose.model("Admin",AdminSchema)

module.exports=AdminModel
