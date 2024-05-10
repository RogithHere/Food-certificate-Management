import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './loginSignUp.css';
import user_icon from '../assets/person.png'
import email_icon from'../assets/email.png'
import password_icon from '../assets/password.png'
import phone_icon from '../assets/telephone.png'
import calendar_icon from '../assets/calendar.png'
import QR from '../assets/QR.jpg'
import axios from "axios";

const LoginSignUp = () => {
  const navigate=useNavigate()
  const  [users,setUsers]=useState([{}])
  const [admin,setAdmin]=useState({
    name:"",
    mail:'',
    password:'',
    number:''
  })
  const[userReq,setUserReq]=useState({
    mail:'',
    requestedPack:'',
    transactionId:'',
    transactionDate:'',
    requestPending:true,
    existingCustomer:false
  })
  useEffect(() => {
    axios.get('http://localhost:3001/userValidation')
      .then(result => {
        console.log(result.data);
        
          setUsers(result.data.users);
          console.log(users)
        
          setAdmin(result.data.admins);
          console.log(admin)
        
      })
      .catch(err => console.error(err));
  }, []);
  
    const [action, setAction] = useState("Sign Up");
    const [loginData, setLoginData] = useState({ mail: '', password: '' });
    const [subscriber, setSubscriber] = useState({
      name: '',
      mobile: '',
      mail: '',
      password: '',
      lastSubscription: '',
      pack: '',
      active: false
    });
    
  
    const validateDetails = () => {
      
      if (!subscriber.name || !subscriber.mobile || !subscriber.mail || !subscriber.password || subscriber.pack==="") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!subscriber.name){
          alert("Enter the User name.");
          return false;
        }
        else if (subscriber.mobile.length !== 10) {
          alert("Mobile number should be 10 digits long.");
          return false;
        }
        else if (!emailRegex.test(subscriber.mail)) {
          alert("Enter proper mail id.");
          return false;
        }
        
        else if(!subscriber.password || subscriber.password.length<8){
          alert("Password should be 8 Characters.");
          return false;
        }
        else if(subscriber.pack===""){
          alert("Select a pack to be registered");
          return false;
        }
        
      }
      return true;
  };
  
  const handleSignup = () => {
      // Validate details before proceeding
      console.log(users,admin);
      if (validateDetails()){
        if(users.some(user => user.mail === subscriber.mail)){alert("mail already exist");}
        else if(users.some(user=>user.mobile===subscriber.mobile)){alert("Mobile Number already Exist");}
        else{
          document.getElementById("Signup_btn").style.display = "none";
          document.getElementById("Login_btn").style.display = "none";
          setAction("Payment");
          console.log(subscriber);
      }
    }

  };
  const ConfirmPayment=()=>{
    if(!userReq.transactionDate|| !userReq.transactionId){
      alert('Enter the transaction details')
      return false;
    }
    console.log("users: ",users,"admin:",admin,"userReq:",userReq,"subscriber:",subscriber)
    axios.post("http://localhost:3001/signupRequest",{userReq,subscriber})
    .then(result=>console.log(result.data))
    .catch(err => console.error(err));
    
    alert("Your Request was submitted to Admin, You will get the confirmation details in your mail as soon as possible. Thank You...")
    location.reload()
  }
  
    const handleLogin = () => {
      console.log(loginData);
      
      if (!loginData.mail || !loginData.password) {
        alert("Please provide both email and password.");
        return;
      }
      else{
        if(admin[0].mail===loginData.mail && admin[0].password===loginData.password){
          navigate("/adminMain")
        }
        else{
          if(users.some(user=>user.mail===loginData.mail && user.password===loginData.password &&  user.active===false)){
            alert("Your Account has been de-activated, kindly mail us regarding the Re-activation details. mail:admin@gmail.com")
          }
          else if(users.some(user=>user.mail===loginData.mail && user.password===loginData.password)){
            navigate("/main/"+loginData.mail)
          }
          else{alert("Mail or Password mismatch")}
      }
    }; 
    }
    return (
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
  
        <div className="inputs">
          {action === "Login" ? (
            <div className="Login-input" >
              <div className="input">
                <img src={email_icon} alt="" />
                <input
                  type="email"
                  placeholder="Enter email id"
                  required
                  onChange={(e) => {setLoginData({...loginData,mail:e.target.value})}}
                />
              </div>
  
              <div className="input">
                <img
                  src={password_icon}
                  alt=""
                  
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  required 
                  onChange={(e) => {setLoginData({...loginData,password:e.target.value})}}
                />
              </div>
            </div>
          ) : (
            <div className="Signup-input" style={{display:action==="Payment"?"none":""}}>
              <div className="input ">
                <img src={user_icon} alt="" />
                <input
                  type="text"
                  placeholder="Enter User name"
                  required
                  onChange={(e) => {setSubscriber({...subscriber,name:e.target.value})}}
                />
              </div>
  
              <div className="input ">
                <img className="phone" src={phone_icon} alt="" />
                <input
                  type="text"
                  placeholder="Enter Mobile Number "
                  required
                  onChange={(e) => {setSubscriber({...subscriber,mobile:e.target.value})}}
                />
              </div>
  
              <div className="input ">
                <img src={email_icon} alt="" />
                <input
                  type="email"
                  placeholder="Enter email id"
                  required
                  onChange={(e) => {setSubscriber({...subscriber,mail:e.target.value});setUserReq({...userReq,mail:e.target.value})}}
                />
              </div>
  
              <div className="input ">
                <img src={password_icon} alt="" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  required
                  onChange={(e) => {setSubscriber({...subscriber,password:e.target.value})}}
                />
              </div>
              <div className="input ">
                    <img src={calendar_icon} alt="" style={{ height: "30px", width: "30px", margin: "0px 25px" }}/>
                    <select
                        className="select"
                        onChange={(e) => {setSubscriber({...subscriber,pack:e.target.value});setUserReq({...userReq,requestedPack:e.target.value})}} required>
                        <option value="">Select a Pack</option>
                        <option value="28">28 days-100rs</option>
                        <option value="56">56 days-200rs</option>
                        <option value="84">84 days-300rs</option>
                        <option value="365">365 days-1200rs</option>
                    </select>
                </div>
                
                    
            </div>

            
          )}
          <div id="payment" style={{display:action!="Payment"?"none":""}}>
          <div className="input">
                <img src={QR} alt="" style={{ height: "400px", width: "600px", marginTop:"150px" }}/></div>
                <div className="input" style={{marginTop:"220px"}}>
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
        
        
  
        {action === "Login" ? (
          <div className="forgot-password">
            Forgot Password? <span>Click Here!!</span>
          </div>
        ):<div></div>  }
  
        <div className="submit-container">
          <div
            className={action === "Login" ? "submit gray" : "submit"} id="Signup_btn"
            onClick={() => {
              action === "Sign Up" ? handleSignup() : setAction("Sign Up");
            }}
          >
            Sign Up
          </div>
          <div
            className={action === "Sign Up" ? "submit gray" : "submit"} id="Login_btn"
            onClick={() => {
              action === "Login" ? handleLogin() : setAction("Login");
            }}
          >
            Login
          </div>
          <div
            className={"submit"} id="Payment_btn" style={{display:action==="Payment"?"":"none",marginTop:"0px"}}
            onClick={() => {ConfirmPayment()}}>
            Confirm
          </div>
        </div>
      </div>
    );
  };
  
export default LoginSignUp