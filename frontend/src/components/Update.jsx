import React, { useEffect,useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Update  () {
    const {id}=useParams();
    const [UserData, setUserData] = useState({
        userMail:'',
        Register_No: '',
        Operator_details: {
          Name: '',
          Email:'',
          Phone:'',
          Address: {
            First_Line: '',
            Second_Line: '',
            Pincode: ''
          }
        },
        Business_details: {
          Kind_of_business: '',
          Address: {
            First_Line: '',
            Second_Line: '',
            Pincode: ''
          }
        },
        Aadhar: '',
        PAN: '',
        Issue: '',
        Validity: '',
        Upto: '',
        Registration_Fee: '',
        Place: '',
        Date: ''
      });
     useEffect(()=>{
        axios.get('http://localhost:3001/viewCustomer/'+id)
        .then(result=>{
            console.log(result.data);
            setUserData(result.data);
            console.log(UserData)
        })
     },[])
    const navigate=useNavigate();
     const handleSubmit=(e)=>{
        e.preventDefault()
        axios.put('http://localhost:3001/updateCustomer/'+id,UserData)
        .then(result=>{
            console.log(result)
            navigate('/main/'+UserData.userMail)
        })
        .catch(err=>console.log(err))
     }
    return (
        <div className="container mt-5" style={{width:"100%"}}>
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Update Customer Details</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="registerNo" className="form-label">Register No:</label>
              <input type="text" className="form-control" id="registerNo" placeholder='Enter the Registration Number' value={UserData.Register_No} required
              onChange={(e)=>setUserData({...UserData,Register_No:e.target.value})}/>
            </div>
            <div className="mb-3">
              <label htmlFor="operatorName" className="form-label">Operator Name:</label>
              <input type="text" className="form-control" id="operatorName" placeholder='Enter the Operator Name' value={UserData.Operator_details.Name} required
              onChange={(e)=>setUserData({...UserData,Operator_details: {...UserData.Operator_details, Name: e.target.value}})}/>
            </div>
            <div className="mb-3">
              <label htmlFor="operatorAddress" className="form-label">Operator Address:</label>
              <input type="text" className="form-control" id="operatorAddress1" placeholder="First Line" value={UserData.Operator_details.Address.First_Line} required
              onChange={(e)=>setUserData({...UserData,Operator_details: {...UserData.Operator_details,Address:{...UserData.Operator_details.Address, First_Line:e.target.value}}})}/>
              <input type="text" className="form-control mt-2" id="operatorAddress2" placeholder="Second Line" value={UserData.Operator_details.Address.Second_Line} required
               onChange={(e)=>setUserData({...UserData,Operator_details: {...UserData.Operator_details,Address:{...UserData.Operator_details.Address, Second_Line:e.target.value}}})}/>
              <input type="text" className="form-control mt-2" id="operatorAddressPincode" placeholder="Pincode" value={UserData.Operator_details.Address.Pincode} required
               onChange={(e)=>setUserData({...UserData,Operator_details: {...UserData.Operator_details,Address:{...UserData.Operator_details.Address, Pincode:e.target.value}}})}/>
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">Email:</label>
              <input type="email" className="form-control" id="Email" placeholder="Enter the Email" value={UserData.Operator_details.Email} required
              onChange={(e)=>setUserData({...UserData,Operator_details: {...UserData.Operator_details, Email: e.target.value}})}/>
            </div>
            <div className="mb-3">
              <label htmlFor="Phone" className="form-label">Phone:</label>
              <input type="number" className="form-control" id="Phone" pattern="[0-9]{10}" placeholder="Enter the Phone" value={UserData.Operator_details.Phone} required
              onChange={(e)=>setUserData({...UserData,Operator_details: {...UserData.Operator_details, Phone: e.target.value}})}/>
            </div>
            <div className="mb-3">
              <label htmlFor="KindOfBusiness" className="form-label">Kind Of Business:</label>
              <input type="text" className="form-control" id="KindOfBusiness" placeholder="Kind Of Business" value={UserData.Business_details.Kind_of_business} required
               onChange={(e)=>setUserData({...UserData,Business_details: {...UserData.Business_details,Kind_of_business:e.target.value}})}/>
            </div>
            <div className="mb-3">
              <label htmlFor="BusinessAddress" className="form-label">Business Address:</label>
              <input type="text" className="form-control" id="BusinessAddress1" placeholder="First Line" value={UserData.Business_details.Address.First_Line} required
               onChange={(e)=>setUserData({...UserData,Business_details: {...UserData.Business_details,Address:{...UserData.Business_details.Address, First_Line:e.target.value}}})}/>
              <input type="text" className="form-control mt-2" id="BusinessAddress2" placeholder="Second Line" value={UserData.Business_details.Address.Second_Line} required
              onChange={(e)=>setUserData({...UserData,Business_details: {...UserData.Business_details,Address:{...UserData.Business_details.Address, Second_Line:e.target.value}}})}/>
              <input type="text" className="form-control mt-2" id="BusinessAddressPincode" placeholder="Pincode" value={UserData.Business_details.Address.Pincode} required
              onChange={(e)=>setUserData({...UserData,Business_details: {...UserData.Business_details,Address:{...UserData.Business_details.Address, Pincode:e.target.value}}})}/>
            </div>

            <div className="mb-3">{/*Business Entity*/}
                <label htmlFor="Business Entity" className="form-label">Business Entity:</label>
                <select className="form-control" id="BusinessEntity" value={UserData.Business_Entity} required
                onChange={(e)=>setUserData({...UserData,Business_Entity:e.target.value})}>
                <option>Select an option</option>
                <option value={"Individual(Proprietor)"}>Individual(Proprietor)</option>
                <option value={"Partnership-Firm"}>Partnership Firm</option>
                <option value={"Private-Limited-Company"}>Private Limited Company</option>
                <option value={"Public-Limited-Company"}>Public Limited Company</option>
                </select>
              </div>

            <div className="mb-3">
              <label htmlFor="Aadhar" className="form-label">Aadhar Number:</label>
              <input type="text" className="form-control" id="Aadhar" placeholder="Enter Your Aadhar Number" value={UserData.Aadhar} required
              onChange={(e)=>setUserData({...UserData,Aadhar:e.target.value})}/>
            </div>
            <div className="mb-3">
              <label htmlFor="PAN" className="form-label">PAN:</label>
              <input type="text" className="form-control" id="PAN" placeholder="Enter your PAN" value={UserData.PAN} required
              onChange={(e)=>setUserData({...UserData,PAN:e.target.value})}/>
            </div>
            <div className="mb-3">
              <label htmlFor="Issue" className="form-label">Issue Date:</label>
              <input type="date" className="form-control" id="Issue" value={UserData.Issue} required
              onChange={(e)=>setUserData({...UserData,Issue:e.target.value})}/>
            </div>
            <div className="mb-3">
              <label htmlFor="validity" className="form-label">Period Of Validity:</label>
              <input type="text" className="form-control" id="validity" placeholder="Enter the period of validity" value={UserData.Validity} required
              onChange={(e)=>setUserData({...UserData,Validity:e.target.value})}/>
            </div>
            <div className="mb-3">
              <label htmlFor="Upto" className="form-label">Valid Upto:</label>
              <input type="date" className="form-control" id="Upto" value={UserData.Upto} required
              onChange={(e)=>setUserData({...UserData,Upto:e.target.value})}/>
            </div>
            <div className="mb-3">
              <label htmlFor="Registration-Fee" className="form-label">Registration Fee:</label>
              <input type="number" className="form-control" id="Registration-Fee" placeholder="Registration Fees" value={UserData.Registration_Fee} required
              onChange={(e)=>setUserData({...UserData,Registration_Fee:e.target.value})}/>
            </div>
            <div className="mb-3">
              <label htmlFor="Place" className="form-label">Place:</label>
              <input type="text" className="form-control" id="Place" placeholder="Enter the Place" value={UserData.Place} required
              onChange={(e)=>setUserData({...UserData,Place:e.target.value})}/>
            </div>
            <div className="mb-3">
              <label htmlFor="Date" className="form-label">Date:</label>
              <input type="date" className="form-control" id="Date" value={UserData.Date} required
              onChange={(e)=>setUserData({...UserData,Date:e.target.value})}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
    );
}

export default Update;
