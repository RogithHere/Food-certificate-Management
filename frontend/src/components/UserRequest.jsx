import React,{useState,useEffect}from 'react';
import axios from 'axios';

const UserRequest = () => {
    const [request, setRequest] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3001/viewRequest")
        .then(result=>{
            console.log(result.data)
            setRequest(result.data);
        })
    },[])
    /*const handleReq = (value, mail) => {
        console.log(value)
        var hello="value";
        axios.put("http://localhost:3001/request/" + mail, hello)
            .then(result => console.log(result))
            .catch(error => console.error("Error updating request:", error));
    }*/
    const handleReqYes=(mail)=>{
        console.log(mail)
        var data={active:true};
        axios.put("http://localhost:3001/request/"+mail,data)
        .then(result=>console.log(result))
        location.reload();
    }
    const handleReqNo=(mail)=>{
        console.log(mail)
        var data={active:false};
        axios.put("http://localhost:3001/request/"+mail,data)
        .then(result=>console.log(result))
        location.reload();
    }

    
    return (
        <div>
        <div className="container mt-5" style={{width:"100%"}}>
          <div className="card shadow-lg">

            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Customer Pending Requests</h4>
            </div>

          <div className="card-body">
          <table  className='table'>
            <thead>
                <tr >
                    <th>Mail</th>
                    <th>Requested Pack</th>
                    <th>Transaction Id</th>
                    <th>Transaction Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {
                request.filter(requ=>requ.requestPending===true && requ.existingCustomer === false).map((requ)=>(
                    <tr key={requ._id}>
                    <td>{requ.mail}</td>
                    <td>{requ.requestedPack}</td>
                    <td>{requ.transactionId}</td>
                    <td>{requ.transactionDate}</td>
                    
                    <td>
                        <div className="button-container">
                        <button className='btn btn-success mr-2' onClick={()=>handleReqYes(requ.mail)}>Accept</button>
                        <button className='btn btn-danger mr-2'onClick={()=>handleReqNo(requ.mail)}>Decline</button>
                        </div>
                    </td>
            </tr>
                ))
            }
            </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="container mt-5" style={{width:"100%"}}>

      <div className="card shadow-lg">

        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Renewal Pending Requests</h4>
        </div>

      <div className="card-body">
      <table  className='table'>
        <thead>
            <tr >
                <th>Mail</th>
                <th>Requested Pack</th>
                <th>Transaction Id</th>
                <th>Transaction Date</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        {
            request.filter(requ=>requ.requestPending===true && requ.existingCustomer === true).map((requ)=>(
                <tr key={requ._id}>
                <td>{requ.mail}</td>
                <td>{requ.requestedPack}</td>
                <td>{requ.transactionId}</td>
                <td>{requ.transactionDate}</td>
                
                <td>
                    <div className="button-container">
                    <button className='btn btn-success mr-2' onClick={()=>handleReqYes(requ.mail)}>Accept</button>
                    <button className='btn btn-danger mr-2'onClick={()=>handleReqNo(requ.mail)}>Decline</button>
                    </div>
                </td>
        </tr>
            ))
        }
        </tbody>
        </table>
      </div>
    </div>
  </div>

  </div>
    );
}

export default UserRequest;
