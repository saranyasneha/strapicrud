import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, Link, useParams ,useLocation} from "react-router-dom";
import axios from "axios";
import '../App.css';

const AddEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation()
    const { create, edit } = location.state;
    console.log(create);
    console.log(edit);
    if (create) {
        console.log("create is true");
    } else if (edit) {
        console.log("Edit is true");
    }
    const [values, setValues] = useState({
        EmployeeId: '',
        EmployeeName: '',
        Age: '',
        City: '',
        Email: '',
        PhoneNumber: '',
        Designation: ''
    })
    const data = {
        EmployeeId: values.EmployeeId,
        EmployeeName: values.EmployeeName,
        Age: values.Age,
        City: values.City,
        Email: values.Email,
        PhoneNumber: values.PhoneNumber,
        Designation: values.Designation
    }
    console.log(data.EmployeeId);
    const onChangeHandle = (e) => {
        setValues({
            ...values, [e.target.name]: e.target.value
        })
    }
    const submitHandler = (e) => {
       if(create){ e.preventDefault();
        axios.post('http://localhost:1337/api/employees', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjc3NzM0NTMzLCJleHAiOjE2ODAzMjY1MzN9.eT4gZTsgmtppPaLdijElmKEX0y5vz08_5j9Lb35X3X0"
            }, data
        }).then(res => {
            console.log(res.data)
            navigate('/')
        }
        )
        console.log(values);
    }
if(edit){
    update();
}
}
useEffect(()=>{
   if(edit) {
    axios.get(`http://localhost:1337/api/employees/${id}`).then((res)=>{
        setValues(res.data.data.attributes);
        console.log(res.data.data.attributes.EmployeeId);
        console.log(values.EmployeeId);
        console.log(values);
    });}
},[]);

function update(e){
    e.preventDefault();
    axios.put(`http://localhost:1337/api/employees/${id}`,{
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjc3NzM0NTMzLCJleHAiOjE2ODAzMjY1MzN9.eT4gZTsgmtppPaLdijElmKEX0y5vz08_5j9Lb35X3X0"
        }, data
    })
    .then(res=>
        { 
            console.log(res.data);
            console.log(values);
        navigate('/')}
    )
}
    return (
        <div className="add-container">
            <h3 style={{ textAlign: 'center', margin: '15px' }}>{edit?"Update Employee Details":"Create an Employee"}</h3>
            <Form >
                <Form.Group>
                    <Form.Control
                        type="text" name='EmployeeId' value={values.EmployeeId}
                        placeholder="Employee Id" onChange={onChangeHandle}
                        required /><br/>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="text" name='EmployeeName' value={values.EmployeeName}
                        placeholder="Employee Name" onChange={onChangeHandle}
                        required /><br />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="text" name='Age' value={values.Age}
                        placeholder="Age" onChange={onChangeHandle}
                        required /><br />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        type="text" name='City' value={values.City}
                        placeholder="City" onChange={onChangeHandle}
                        required /><br />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="email" name='Email' value={values.Email}
                        placeholder="Mail Id" onChange={onChangeHandle}
                        required /><br />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="text" name='PhoneNumber'value={values.PhoneNumber}
                        placeholder="Phone Number" onChange={onChangeHandle}
                        required /><br />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="text" name='Designation'value={values.Designation}
                        placeholder="Designation" onChange={onChangeHandle}
                        required /><br />
                </Form.Group>
                {create?<Button variant="success" className="btn mx-3 create" type="submit" onClick={submitHandler} block>Save</Button>:
                <Button variant="success" className="btn mx-3 update" type="submit" onClick={update} block>update</Button>}
                
                <Link to="/"><Button variant="danger" type="submit" block>Cancel</Button></Link>

            </Form></div>
    )
}
export default AddEdit;