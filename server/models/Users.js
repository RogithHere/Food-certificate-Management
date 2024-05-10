const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
      name: String,
      mobile: String,
      mail: String,
      password: String,
      lastSubscription: String,
      pack: String,
      active: Boolean,
      existingCustomer:Boolean
})

const UserModel=mongoose.model("user",UserSchema)

module.exports=UserModel
