const mongoose=require('mongoose')

const CustomerSchema=new mongoose.Schema({
    userMail:String,
    Register_No: String,
    Operator_details: {
        Name: String,
        Email: String,
        Phone: String,
        Address: {
            First_Line: String,
            Second_Line: String,
            Pincode: String
        }
    },
    Business_details: {
        Kind_of_business: String,
        Address: {
            First_Line: String,
            Second_Line: String,
            Pincode: String
        }
    },
    Business_Entity:String,
    Aadhar: String,
    PAN: String,
    Issue: String,
    Validity: String,
    Upto: String,
    Registration_Fee: String,
    Place: String,
    Date: String
})

const CustomerModel=mongoose.model("customer",CustomerSchema)

module.exports=CustomerModel
