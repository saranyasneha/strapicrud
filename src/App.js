import React from 'react';
import './App.css';
import axios from 'axios';
import { useNavigate,Link,useParams } from 'react-router-dom';
import {Button, Table} from 'react-bootstrap';
import { useEffect, useState } from 'react';


function App() {
  const {id}=useParams();
  const navigate=useNavigate();
  const [employees,setEmployees]=useState([]);
  const [create,setCreate]=useState(false)
  const [edit,setEdit]=useState(false)
  const getEmployeeData=async ()=>{
    try{
      axios.get('http://localhost:1337/api/employees').then(res=>{
        setEmployees(res.data.data);
        console.log(res.data.data);
        console.log(res.data);
        console.log(res);
      })
     }
    catch(e){
     console.log(e);
    }
  }
  useEffect(()=>{
    getEmployeeData();
  },[])
  
  const addBtn=()=>{
    
  }
  console.log(employees); 

const deleteHandler=(id)=>{
  axios.delete(`http://localhost:1337/api/employees/${id}`).then(del=>{
    getEmployeeData()
    window.confirm(`Do you want to delete ${id}?`)
  }
   
  )
  console.log(id);
}
const createBtn=()=>{
  setCreate(true)
  console.log(create);
}
useEffect(()=>{
  createBtn();
  editBtn();
},[])
const editBtn=()=>{
  setEdit(true)
}
  return (<>
    <nav class="navbar navbar-light bg-light">
  <span class="navbar-brand mb-2 h1">Employee Details</span>
</nav>
    <div className="App">
      <Link to={`/AddEdit`} state={{create}}><Button variant='success'  
      onClick={addBtn} data-toggle="modal" className='add-btn'>Add Employee</Button></Link>
      <Table  striped bordered hover size="lg" className='table'>
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th>Employee Age</th>
            <th>Employee City</th>
            <th>Employee Mail Id</th>
            <th> Phone Number</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((item)=>{
            return(
              <tr key={item.id}>
                <td>{item.attributes.EmployeeId}</td>
                <td>{item.attributes.EmployeeName}</td>
                <td>{item.attributes.Age}</td>
                <td>{item.attributes.City}</td>
                <td>{item.attributes.Email}</td>
                <td>{item.attributes.PhoneNumber}</td>
                <td>{item.attributes.Designation}</td>
                <td className='action'>
                <div className='buttons'>
                <Link to={`/addEdit/${item.id}`} state={{edit}}><i class="fa fa-pencil edit" onClick={editBtn}></i></Link>
                <i class="fa fa-trash delete" onClick={()=>deleteHandler(item.id)}></i>
                </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
    
    </>
  );
}

export default App;
