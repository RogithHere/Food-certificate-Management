const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const CustomerModel =require('./models/Customers')
const UserModel=require('./models/Users')
const RequestModel=require('./models/Request')
const AdminModel=require('./models/Admin')
var nodemailer = require('nodemailer');
var moment=require('moment')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'crazieeaadhi02@gmail.com',
    pass: 'vyxx mhgz piun zylu'
  },
  tls: {
    rejectUnauthorized: false
  }
});


const app=express();
app.use(cors())
app.use(express.json())


function MailSend(mailid,content){
    var text,subject;
    if(content==='Request'){
        subject='Requesting Account'
        text=`There is an Request from ${mailid} for acceptance.`
        mailid='crazieeaadhi02@gmail.com'
    }
    else if(content==='Confirm-Yes'){
        subject='Your Account Validation'
        text=`Your Payment details has been Verified and your account is now active!!! \n Thank you for joining us,Hope we have a great journey`
    }
    else if(content==='Confirm-No'){
        subject='Your Account Validation'
        text=`The payment details were incorrect or not valid kindly contact us crazieeaadhi02@gmail.com`
    }
    else if(content==='Account-deactive'){
        subject='Your Account Activated'
        text=`Your Account that has been in not active, Now it is activated!!! Thank you for comming again.`
    }
    else if(content==='Account-active'){
        subject='Your Account De-Activated :('
        text=`Your Account that has been in active, Now it is De-activated :( \n For Reactivation Details Contact crazieeaadhi02@gmail.com.`
    }
    var mailOptions={
        from:'crazieeaadhi02@gmail.com',
        to:mailid,
        subject:subject,
        text:text
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            return error;
        }else{
            return 'Email sent: '+info.response;
        }
    })


}
mongoose.connect("mongodb://127.0.0.1:27017/food-certificate")

app.post('/createCustomer',(req,res)=>{
    CustomerModel.create(req.body)
    .then(customer=>res.json(customer))
    .catch(err=>res.json(err))
})

app.get('/viewCustomers/:mail',(req,res)=>{
    var mail=req.params.mail;
    CustomerModel.find({userMail:mail})
    .then(customer=>res.json(customer))
    .catch(err=>res.json(err))
})

app.get('/viewCustomer/:id',(req,res)=>{
    var id=req.params.id
    CustomerModel.findById(id)
    .then(customer=>res.json(customer))
    .catch(err=>res.json(err))
})


app.put('/updateCustomer/:id', (req, res) => {
    var id = req.params.id;
    var updateData = req.body; 
    CustomerModel.findOneAndUpdate({ _id: id }, updateData, { new: true }) 
        .then(customer => res.json(customer))
        .catch(err => res.json(err));
});

app.delete('/delete/:id',(req,res)=>{
    var id=req.params.id;
    CustomerModel.findByIdAndDelete(id)
    .then(customer=>res.json(customer))
    .catch(err=>res.json(err))
})

app.get('/userValidation', (req, res) => {
    let userData = {};
    UserModel.find()
        .then(users => {
            userData.users = users;
            console.log(userData.users);
            return AdminModel.find();
        })
        .then(admins => {
            userData.admins = admins;
            console.log(userData.admins);
            res.json(userData);
        })
        .catch(err => res.json(err));
});

app.post('/signupRequest', async (req, res) => {
    try {
      const { userReq, subscriber } = req.body;
    //console.log(MailSend(userReq,'Request'));
      // Save subscriber data to UserModel
      await UserModel.create(subscriber);
  
      // Save user request data to RequestModel
      await RequestModel.create(userReq);
  
      res.status(201).send("Request submitted successfully.");
    } catch (error) {
      console.error("Error submitting request:", error);
      res.status(500).send("Internal server error.");
    }
  });
app.get("/viewUser",(req,res)=>{
    UserModel.find()
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
})

app.get("/viewRequest",(req,res)=>{
    RequestModel.find()
    .then(request=>res.json(request))
    .catch(err=>res.json(err))
})

/*app.put("/request/:mail", async (req, res) => {
    try {
        var mail = req.params.mail;
        console.log(mail,req.body.value)
        var pending = req.body && req.body.active !== undefined ? !req.body.active : true;
        console.log(pending)
        await RequestModel.findOneAndUpdate({ mail: mail }, { requestPending: pending });

        await UserModel.findOneAndUpdate({ mail: mail }, { active: req.body ? req.body.active : false });

        res.status(200).send("Request and user updated successfully");
    } catch (err) {
        console.error("Error updating request or user:", err);
        res.status(500).send("Internal Server Error");
    }
});*/

app.put("/request/:mail", async (req, res) => {
    try {
        const mail = req.params.mail;
        const { active } = req.body; 

        //console.log(mail, req.body,MailSend(mail,active===true?'Confirm-Yes':'Confirm-No'));
        

        // Update request status in RequestModel
        await RequestModel.findOneAndUpdate({ mail: mail }, { requestPending: false ,existingCustomer:active});
        

        // Update user status in UserModel based on 'active'
        const currentDate = moment().format("YYYY-MM-DD");;
        await UserModel.findOneAndUpdate(
            { mail: mail },
            { active: active, lastSubscription: currentDate,existingCustomer:true }
        );

        res.status(200).json({ message: "Request and user updated successfully" });
    } catch (err) {
        console.error("Error updating request or user:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put("/activity/:mail",(req,res)=>{
    var mail=req.params.mail;
    const { active } = req.body;
    const newActiveState = active ? false : true;
    //MailSend(mail,active?'Account-active':'Account-deactive')
    console.log(newActiveState)
    UserModel.findOneAndUpdate({mail:mail},{active:newActiveState})
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
})


app.post("/mailSending",(req,res)=>{
    details=req.body;
    var mailOptions={
        from:'crazieeaadhi@gmail.com',
        to:details.email,
        subject:details.subject,
        text:details.text
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            res.json(error);
        }else{
            res.json('Email sent: '+info.response);
        }
    })

})

app.listen(3001,()=>{
    console.log("helloo theree....")
    console.log("app is listening....")
})