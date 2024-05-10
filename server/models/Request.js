const mongoose=require('mongoose')

const RequestSchema=new mongoose.Schema({
      mail: String,
      requestedPack: String,
      transactionId: String,
      transactionDate:String,
      requestPending: Boolean,
      existingCustomer:Boolean
})

const RequestModel=mongoose.model("request",RequestSchema)

module.exports=RequestModel
