import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
const AdminMain = () => {
    const [Users, setUsers] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3001/viewUser")
        .then(result=>{
            console.log(result.data)
            setUsers(result.data);
            const currentDate=moment().format('YYYY-MM-DD');
        const calculatedDates=result.data.map((user)=>{
            const uptoDate=moment(user.lastSubscription,'YYYY-MM-DD');
            const daysLeft = Math.ceil(uptoDate.diff(currentDate) / (1000 * 60 * 60 * 24));
            console.log(daysLeft)
            return {daysLeft,mail:user.mail,pack:user.pack}
        })
        calculatedDates.map((user)=>{
            if((user.pack-user.daysLeft)===10){
                user.subject=`Subscription details`,
                user.text=`Your Subscription going to end in 10 days.`
            }
            else if((user.pack-user.daysLeft)===5){
                user.subject=`Subscription details`,
                user.text=`Your Subscription going to end in 5 days.\nFor Reactivation details contact crazieeaadhi02@gmail.com`
            }
            else if((user.pack-user.daysLeft)<=0){
                user.subject=`Subscription details`,
                user.text=`Your Subscription is ended, Account will be deactivated any time soon. \nFor Reactivation details contact crazieeaadhi02@gmail.com`
            }
            console.log(user)
        })
        })
        
    },[])
    const handleClick=(user)=>{
        var mail=user.mail;
        var data={active:user.active}
        console.log(data);
        axios.put("http://localhost:3001/activity/"+mail,data)
        .then(result=>console.log(result))
        location.reload()
        alert(`Account ${mail} Deactivated`);
    }
    return (
        <div className='bg-primary' style={{width:'100%'}}>
            <div className='w-100 bg-primary rounded p-3'style={{width:'100%'}}>
                <h2>Users</h2>
            <div className='d-flex' style={{marginBottom:'20px'}}>
              <input type='text'   placeholder='Search Users' className='form-control w-80 'style={{ height: '40px' ,width:'1200px'}}/>
                <Link to={"/admin/request"} className='btn btn-success'style={{ height: '40px',marginLeft:'10px'}}>Requests</Link>
                <Link to={"/"} className='btn btn-success'style={{ height: '40px',marginLeft:'10px'}}>Log out</Link>
                
            </div>
            <table  className='table'>
            <thead>
                <tr >
                    <th>Name</th>
                    <th>Email</th>
                    <th>Number</th>
                    <th>Validity</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {Users.filter(user => user.existingCustomer === true).map(user => (
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.mail}</td>
                    <td>{user.mobile}</td>
                    <td>{user.lastSubscription}</td>
                    <td>{user.active ? "Active" : "InActive"}</td>
                    <td>
                        <div className="button-container">
                            <button className='btn btn-primary mr-2' onClick={() => handleClick(user)}>{user.active ? "De-activate" : "Activate"}</button>
                        </div>
                    </td>
                </tr>
            ))}
            
            </tbody>
            </table>
            </div>
            
        </div>
    );
}

export default AdminMain;
