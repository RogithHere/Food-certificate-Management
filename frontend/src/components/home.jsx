import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import moment from 'moment';

function Home(){
    var {mail}=useParams()    
    const [Users,setUsers]=useState({
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
    const [searchQuery, setSearchQuery] = useState('');
    const [ShowUsers,setShowUsers]=useState('');
     useEffect(()=>{
      console.log(mail)
    axios.get('http://localhost:3001/viewCustomers/'+mail)
    .then(result=>{
        
        setUsers(result.data);
        console.log(result.data);
        setShowUsers(result.data);
        console.log(ShowUsers);
        const currentDate=moment().format('YYYY-MM-DD');
        console.log(currentDate)
        const calculatedDates=result.data.map(user=>{
          const uptoDate=moment(user.Upto,'YYYY-MM-DD');
          console.log('Parsed Upto Date:', uptoDate.format('YYYY-MM-DD'),`Without Parsing: ${user.Upto}`);
          const daysLeft = Math.ceil(uptoDate.diff(currentDate) / (1000 * 60 * 60 * 24));
          return { daysLeft, email: user.Operator_details.Email, upto:user.Upto };
        })
        calculatedDates.map((user)=>{
          console.log("yess",user)
          if (user.daysLeft<=0){
            user.text="Your Food certificate is expired...\nRegarding Your Renewal of food Certificate Contact:8428598926";
            user.subject="Expired!!!!"
            //axios.post('http://localhost:3001/mailSending',user)
            //.then(result=>console.log(result))
          }
          if (user.daysLeft===5){
            user.text="Your Food certificate is expiring in 5days...\nRegarding Your Renewal of food Certificate Contact:8428598926";
            user.subject="Expiring!!!!"
            //axios.post('http://localhost:3001/mailSending',user)
            //.then(result=>console.log(result))
          }
          if (user.daysLeft===10){
            user.text="Your Food certificate is expiring in 10days...\nRegarding Your Renewal of food Certificate Contact:8428598926";
            user.subject="Expiring!!!!"
            //axios.post('http://localhost:3001/mailSending',user)
            //.then(result=>console.log(result))
          }
        })
    })
     },[])
     
     const handleDelete=(id)=>{
      alert("Deleted");
        axios.delete("http://localhost:3001/delete/"+id)
        .then(res=>{
            location.reload();
            console.log(res.data);
            
    }).catch(err=>console.log(err));
    }
    const handleSearchChange = (event) => {
      if(event.target.value.toLowerCase()==""){
        setShowUsers(Users);
      }else{const filteredUsers = Users.filter(user =>
        user.Operator_details.Name.toLowerCase().startsWith(event.target.value.toLowerCase())
      );
      setShowUsers(filteredUsers);
    }
    };
    const handleSortChange=(event)=>{
      if(event.target.value==""){
        setShowUsers(Users);
      }else{
        setShowUsers(Users.filter(user => user.Business_Entity === event.target.value));
      }
    }
          return (
        <div className='  bg-primary' style={{width:'100%'}}>
            <div className='w-100 bg-primary rounded p-3'style={{width:'100%'}}>
                <h2>Customers</h2>
            <div className='d-flex' style={{marginBottom:'20px'}}>
              <input type='text' onChange={handleSearchChange}  placeholder='Search Customer' className='form-control w-80 'style={{ height: '40px' ,width:'1200px'}}/>
                <Link to={"/create/"+mail} className='btn btn-success'style={{ height: '40px',marginLeft:'10px'}}>Create +</Link>
                <div className='d-flex justify-content-end'>
                {/*<select className="form-select" onChange={handleSortChange} style={{ height: '40px',marginLeft:'10px', width:'105px'}}>
                <option value="">Sort{'</>'}</option>
                <option>Validity</option>
                <option value={"Individual(Proprietor)"}>Individual(Proprietor)</option>
                <option value={"Partnership-Firm"}>Partnership Firm</option>
                <option value={"Private-Limited-Company"}>Private Limited Company</option>
                <option value={"Public-Limited-Company"}>Public Limited Company</option>
          </select>*/}
          <Link to={"/"} className='btn btn-success'style={{ height: '40px',marginLeft:'10px'}}>Log out</Link>
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
                   
 Object.values(ShowUsers).map((user) => (
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
