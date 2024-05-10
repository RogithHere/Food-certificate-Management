import React, { useEffect,useState} from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';


function View(){
    const {id}=useParams();
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
     

    return (
        <div className="container mt-5">
        <div className="card bg-dark text-white">
          <div className="card-header bg-primary">
            <h4 className="mb-0">Food Certificate Details</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <h5>Operator Details</h5>
                <p><strong>Operator Name:</strong> {UserData.Operator_details.Name}</p>
                <p><strong>Email:</strong> {UserData.Operator_details.Email}</p>
                <p><strong>Phone:</strong> {UserData.Operator_details.Phone}</p>
                <p><strong>Address:</strong> {UserData.Operator_details.Address.First_Line}, {UserData.Operator_details.Address.Second_Line}, {UserData.Operator_details.Address.Pincode}</p>
              </div>
              <div className="col-md-6">
                <h5>Business Details</h5>
                <p><strong>Kind Of Business:</strong> {UserData.Business_details.Kind_of_business}</p>
                <p><strong>Address:</strong> {UserData.Business_details.Address.First_Line}, {UserData.Business_details.Address.Second_Line}, {UserData.Business_details.Address.Pincode}</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <h5>Personal Details</h5>
                <p><strong>Aadhar Number:</strong> {UserData.Aadhar}</p>
                <p><strong>PAN:</strong> {UserData.PAN}</p>
              </div>
              <div className="col-md-6">
                <h5>Other Details</h5>
                <p><strong>Business Entity:</strong> {UserData.Business_Entity}</p>
                <p><strong>Issue Date:</strong> {UserData.Issue}</p>
                <p><strong>Period Of Validity:</strong> {UserData.Validity} years</p>
                <p><strong>Valid Upto:</strong> {UserData.Upto}</p>
                <p><strong>Registration Fee:</strong> {UserData.Registration_Fee}</p>
                <p><strong>Place:</strong> {UserData.Place}</p>
                <p><strong>Date:</strong> {UserData.Date}</p>
              </div>
            </div>
          </div>
          <Link to={`/update/${UserData._id}`} className='btn btn-primary mr-2'>Edit</Link>
        </div>
      </div>
    );
}

export default View;
