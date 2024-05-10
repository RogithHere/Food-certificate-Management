/*const express=require('express')
const bodyParser=require('body-parser')
const nodeMailer=require('nodemailer')
const app= express();

app.use(bodyParser.json());

app.post('/sent-email',(req,res)=>{
    const {subject,recipient}=req.body;

    const transporter=nodeMailer.createTransport({
        service:'gmail',
        auth:{
            user:'crazieeaadhi02@gmail.com',
            pass:'Craziee@02'
        }
    });

    const mailOptions={
        from:'crazieeaadhi02@gmail.com',
        to:recipient,
        subject:subject,
        text:'This is a test email'
    };

    transporter.sendMail(mailOptions,function(error){
        if(error){
            console.log(error);
            res.status(500).send('Error sending email')
        }else{
            console.log('Email sent: '+ info.response)
            res.status(200).send('Email sent successfully')
        }
    });
});

app.listen(3005,()=>{
    console.log("server Started");
})*/
import nodemailer from 'nodemailer'
// Function to send email
const sendEmail = (subject, recipient, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'crazieeaadhi02@gmail.com',
            pass: 'Craziee@02'
        },
        tls: {
            rejectUnauthorized: false // Ignore SSL verification
        }
    });

    const mailOptions = {
        from: 'crazieeaadhi02@gmail.com',
        to: recipient,
        subject: subject,
        text: text || 'This is a test email'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            // Handle error
        } else {
            console.log('Email sent: ' + info.response);
            // Handle success
        }
    });
};

sendEmail('Test Subject', 'rogith200602@gmail.com');
