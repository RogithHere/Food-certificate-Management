import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './loginSignUp.css';
import email_icon from'../assets/email.png'
import calendar_icon from '../assets/calendar.png'
import QR from '../assets/QR.jpg'
import axios from "axios";
const Subscription = () => {
    const navigate=useNavigate()
    const  [users,setUsers]=useState([{}])
    const[userReq,setUserReq]=useState({
      mail:'',
      requestedPack:'',
      transactionId:'',
      transactionDate:'',
      requestPending:true,
      existingCustomer:true
    })
    useEffect(() => {
      axios.get('http://localhost:3001/userValidation')
        .then(result => {
          console.log(result.data);
          
            setUsers(result.data.users);
            console.log(users)
          
        })
        .catch(err => console.error(err));
    }, []);
    const validateDetails = () => {
      const { mail, requestedPack, transactionId, transactionDate } = userReq;
  
      if (!mail || !requestedPack || !transactionId || !transactionDate) {
          alert("Please fill in all the required fields.");
          return false;
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(mail)) {
          alert("Enter a valid email address.");
          return false;
      }
  
      return true;
  };
  
    const ConfirmPayment=()=>{
      if (validateDetails()){
        if(users.some(user => user.mail === userReq.mail && user.existingCustomer === true))
        {
          console.log("userReq:",userReq)
      axios.post("http://localhost:3001/signupRequest",{userReq})
      .then(result=>console.log(result.data))
      .catch(err => console.error(err));
      
      alert("Your Request was submitted to Admin, You will get the confirmation details in your mail as soon as possible. Thank You...")
      navigate('/');
          }else if(users.some(user => user.mail === userReq.mail && user.existingCustomer === false)){
            alert("Request for the permission is still pending");
          }
        else{
          alert("Mail not exist");
      }
    }
    
    }
      return (
        <div className="container">
          <div className="header">
            <div className="text">Subscription</div>
            <div className="underline"></div>
          </div>
    
          <div className="inputs">
            <div id="payment">
            <div className="input">
                  <img src={QR} alt="" style={{ height: "400px", width: "600px", marginTop:"150px" }}/></div>
                  <div className="input "style={{marginTop:"250px"}}>
                  <img src={email_icon} alt="" style={{ height: "30px", width: "30px", margin: "0px 25px" }}/>
                  <input
                    type="email"
                    placeholder="Enter email id"
                    required
                    onChange={(e) => {setUserReq({...userReq,mail:e.target.value})}}
                  />
                </div><div className="input ">
                      <img src={calendar_icon} alt="" style={{ height: "30px", width: "30px", margin: "0px 25px" }}/>
                      <select
                          className="select"
                          onChange={(e) => {setUserReq({...userReq,requestedPack:e.target.value})}} required>
                          <option value="">Select a Pack</option>
                          <option value="28">28 days-100rs</option>
                          <option value="56">56 days-200rs</option>
                          <option value="84">84 days-300rs</option>
                          <option value="365">365 days-1200rs</option>
                      </select>
                  </div>

                  <div className="input" style={{marginTop:"20px"}}>
                  <input 
                    type="text" style={{marginLeft:"20px"}}
                    placeholder="Enter the Transaction id"
                    required
                    onChange={(e) => {setUserReq({...userReq,transactionId:e.target.value})}}
                  />
                </div>
                <div className="input" >
                  <input 
                    type="date" style={{marginLeft:"20px"}}
                    placeholder="Enter the Transaction id"
                    required
                    onChange={(e) => {setUserReq({...userReq,transactionDate:e.target.value})}}
                  />
                </div>
            </div>
          </div >
          
          
    
    
          <div className="submit-container">
            
            <div
              className={"submit"} id="Payment_btn" style={{marginTop:"0px"}}
              onClick={() => {ConfirmPayment()}}>
              Confirm
            </div>
          </div>
        </div>
      );
    };

export default Subscription;
