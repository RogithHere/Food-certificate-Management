import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './App.css'
import Create from './Create';
import View from './View';
import Update from './Update';
import axios from 'axios'

function Home(){
    
    const [Users, setUsers] = useState([]);
     useEffect(()=>{
    axios.get('http://localhost:3001/viewCustomer')
    .then(result=>{
        console.log(result.data)
        setUsers(result.data);
    })
     },[])
     const handleDelete=(id)=>{
        axios.delete("http://localhost:3001/delete/"+id)
        .then(res=>{
            location.reload();
            console.log(res.data);
            
    }).catch(err=>console.log(err));
    }

    const [searchQuery,setSearchQuery]=useState('')
    const [sortOption,setSortOption]=useState('')
    useEffect(() => {
      console.log(searchQuery,sortOption)
    }, [searchQuery, sortOption]);
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    
    const handleSortChange = (event) => {
      setSortOption(event.target.value);
    };
          return (
        <div className='  bg-primary' style={{width:'100%'}}>
            <div className='w-100 bg-primary rounded p-3'style={{width:'100%'}}>
                <h2>Customers</h2>
            <div className='d-flex' style={{marginBottom:'20px'}}>
              <input type='text' value={searchQuery} onChange={handleSearchChange}  placeholder='Search Customer' className='form-control w-80 'style={{ height: '40px' ,width:'1200px'}}/>
                <Link to="/create" className='btn btn-success'style={{ height: '40px',marginLeft:'10px'}}>Create +</Link>
                <div className='d-flex justify-content-end'>
                <select value={sortOption} onChange={handleSortChange} className="form-select" style={{ height: '40px',marginLeft:'10px', width:'105px'}}>
                <option value="">Sort{'</>'}</option>
                <option>Validity</option>
                <option value={"Individual(Proprietor)"}>Individual(Proprietor)</option>
                <option value={"Partnership-Firm"}>Partnership Firm</option>
                <option value={"Private-Limited-Company"}>Private Limited Company</option>
                <option value={"Public-Limited-Company"}>Public Limited Company</option>
                </select>
                </div>
            </div>
            <table  className='table'>
            <thead>
                <tr >
                    <th>Name</th>
                    <th>Kind of business</th>
                    <th>Business Entity</th>
                    <th>Register No</th>
                    <th>Valid Upto</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {
  Users.map((user) => (
    <tr key={user._id}>
      <td>{user.Operator_details.Name}</td>
      <td>{user.Business_details.Kind_of_business}</td>
      <td>{user.Business_Entity}</td>
      <td>{user.Register_No}</td>
      <td>{user.Upto}</td>
      <td>
        <div className="button-container">
          <Link to={`/view/${user._id}`} className='btn btn-primary mr-2'>View</Link>
          <Link to={`/update/${user._id}`} className='btn btn-primary mr-2'>Edit</Link>
          <button onClick={()=>handleDelete(user._id)} className='btn btn-danger'>Delete</button>
        </div>
      </td>
    </tr>
  ))
}

            </tbody>
            </table>
            </div>
            
        </div>
    );
}

export default Home;
