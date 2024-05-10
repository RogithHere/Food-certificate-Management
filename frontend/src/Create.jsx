import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create() {
    const [UserData, setUserData] = useState({
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
        Business_Entity:'',
        Aadhar: '',
        PAN: '',
        Issue: '',
        Validity: '',
        Upto: '',
        Registration_Fee: '',
        Place: '',
        Date: ''
      });
      
    const navigate = useNavigate();

    
    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        
        axios.post('http://localhost:3001/createCustomer', UserData)
            .then(result => {
                console.log(result);
                navigate('/');
            })
            
    }

    
      return (
        
        <div className="container mt-5">

          <div className="card shadow-lg">

            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Add New Customer+</h4>
            </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>

              <div className="mb-3">{/*Registration Number*/}
                <label htmlFor="registerNo" className="form-label">Register No:</label>
                <input type="text" className="form-control" id="registerNo" placeholder='Enter the Registration Number' required
                onChange={(e)=>setUserData({...UserData,Register_No:e.target.value})}/>
              </div>

              <div className="mb-3">{/*Operator Name*/}
                <label htmlFor="operatorName" className="form-label">Operator Name:</label>
                <input type="text" className="form-control" id="operatorName" placeholder='Enter the Operator Name' required
                onChange={(e)=>setUserData({...UserData,Operator_details: {...UserData.Operator_details, Name: e.target.value}})}/>
              </div>

              <div className="mb-3">{/*Operator Address*/}
                <label htmlFor="operatorAddress" className="form-label">Operator Address:</label>
                <input type="text" className="form-control" id="operatorAddress1" placeholder="First Line" required
                onChange={(e)=>setUserData({...UserData,Operator_details: {...UserData.Operator_details,Address:{...UserData.Operator_details.Address, First_Line:e.target.value}}})}/>

                <input type="text" className="form-control mt-2" id="operatorAddress2" placeholder="Second Line" required
                onChange={(e)=>setUserData({...UserData,Operator_details: {...UserData.Operator_details,Address:{...UserData.Operator_details.Address, Second_Line:e.target.value}}})}/>

                <input type="text" className="form-control mt-2" id="operatorAddressPincode" placeholder="Pincode" required
                onChange={(e)=>setUserData({...UserData,Operator_details: {...UserData.Operator_details,Address:{...UserData.Operator_details.Address, Pincode:e.target.value}}})}/>
              </div>

              <div className="mb-3">{/*EMail*/}
                <label htmlFor="Email" className="form-label">Email:</label>
                <input type="email" className="form-control" id="Email" placeholder="Enter the Email" required
                onChange={(e)=>{console.log(UserData);setUserData({...UserData,Operator_details: {...UserData.Operator_details, Email: e.target.value}})}}/>
              </div>

              <div className="mb-3">{/*Number */}
                <label htmlFor="Phone" className="form-label">Phone:</label>
                <input type="number" className="form-control" id="Phone" pattern="[0-9]{10}" placeholder="Enter the Phone" required
                onChange={(e)=>setUserData({...UserData,Operator_details: {...UserData.Operator_details, Phone: e.target.value}})}/>
              </div>
              
              <div className="mb-3">{/*Kind Of Business*/}
                <label htmlFor="kind Of Business" className="form-label">Kind Of Business:</label>
                <input type="text" className="form-control" id="kindOfBusiness" placeholder='Kind of business' required
                onChange={(e)=>setUserData({...UserData,Business_details: {...UserData.Business_details, Kind_of_business: e.target.value}})}/>
              </div>
              
              <div className="mb-3">{/*Business Address*/}
                <label htmlFor="BusinessAddress" className="form-label">Business Address:</label>
                <input type="text" className="form-control" id="BusinessAddress1" placeholder="First Line" required
                onChange={(e)=>setUserData({...UserData,Business_details: {...UserData.Business_details,Address:{...UserData.Business_details.Address, First_Line:e.target.value}}})}/>

                <input type="text" className="form-control mt-2" id="BusinessAddress2" placeholder="Second Line" required
                onChange={(e)=>setUserData({...UserData,Business_details: {...UserData.Business_details,Address:{...UserData.Business_details.Address, Second_Line:e.target.value}}})}/>

                <input type="text" className="form-control mt-2" id="BusinessAddressPincode" placeholder="Pincode" required
                onChange={(e)=>setUserData({...UserData,Business_details: {...UserData.Business_details,Address:{...UserData.Business_details.Address, Pincode:e.target.value}}})}/>
              </div>
              
              <div className="mb-3">{/*Business Entity*/}
                <label htmlFor="Business Entity" className="form-label">Business Entity:</label>
                <select className="form-control" id="BusinessEntity"  required
                onChange={(e)=>setUserData({...UserData,Business_Entity:e.target.value})}>
                <option>Select an option</option>
                <option value={"Individual(Proprietor)"}>Individual(Proprietor)</option>
                <option value={"Partnership-Firm"}>Partnership Firm</option>
                <option value={"Private-Limited-Company"}>Private Limited Company</option>
                <option value={"Public-Limited-Company"}>Public Limited Company</option>
                </select>
              </div>

              <div className="mb-3">{/*Aadhar */}
                <label htmlFor="Aadhar" className="form-label">Aadhar Number:</label>
                <input type="text" className="form-control" id="Aadhar" placeholder="Enter Your Aadhar Number" required
                onChange={(e)=>setUserData({...UserData,Aadhar:e.target.value})}/>
              </div>

              <div className="mb-3">{/* */}
                <label htmlFor="PAN" className="form-label">PAN:</label>
                <input type="text" className="form-control" id="PAN" placeholder="Enter your PAN" required
                onChange={(e)=>setUserData({...UserData,PAN:e.target.value})}/>
              </div>

              <div className="mb-3">
                <label htmlFor="Issue" className="form-label">Issue Date:</label>
                <input type="date" className="form-control" id="Issue" required
                onChange={(e)=>setUserData({...UserData,Issue:e.target.value})}/>
              </div>

              <div className="mb-3">
                <label htmlFor="validity" className="form-label">Period Of Validity:</label>
                <input type="text" className="form-control" id="validity" placeholder="Enter the period of validity" required
                onChange={(e)=>setUserData({...UserData,Validity:e.target.value})}/>
              </div>

              <div className="mb-3">
                <label htmlFor="Upto" className="form-label">Valid Upto:</label>
                <input type="date" className="form-control" id="Upto" required
                onChange={(e)=>setUserData({...UserData,Upto:e.target.value})}/>
              </div>

              <div className="mb-3">
                <label htmlFor="Registration-Fee" className="form-label">Registration Fee:</label>
                <input type="number" className="form-control" id="Registration-Fee" placeholder="Registration Fees" required
                onChange={(e)=>setUserData({...UserData,Registration_Fee:e.target.value})}/>
              </div>

              <div className="mb-3">
                <label htmlFor="Place" className="form-label">Place:</label>
                <input type="text" className="form-control" id="Place" placeholder="Enter the Place" required
                onChange={(e)=>setUserData({...UserData,Place:e.target.value})}/>
              </div>

              <div className="mb-3">
                <label htmlFor="Date" className="form-label">Date:</label>
                <input type="date" className="form-control" id="Date" required
                onChange={(e)=>setUserData({...UserData,Date:e.target.value})}/>
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>

            </form>
          </div>
        </div>
      </div>
      );
    }    

export default Create;
