import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axios from 'axios'
import{Modal,Spinner} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate()
  let[email,setEmail]=useState('')
  let[password,setPassword]=useState('')
   let[showSpinner,setShowSpinner]=useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    navigate('/mobiles')
  }; 

  function doLogin(){
    setShowSpinner(true)
    let data={
      email:email,
      password:password
    }
    axios({
      url:apiUrl+'/admin/login',
      method:'post',
      data:data
    }).then((result)=>{
      if(result.data.success){
        setShow(true)
         setShowSpinner(false)

      }

    }).catch((err)=>{
      alert('Invalid Username /Password')
      console.log(err)
    })
  }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card style={{ width: '28rem' }} className="shadow-lg p-4 border-0 rounded-4">
        <h4 className="text-center mb-4 text-primary">Admin Login</h4>
        <Form>
          <Form.Group className="mb-3" >
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"  onChange={(e)=>setEmail(e.target.value)}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>

          <div className="d-grid">
            <Button variant="success" type="button" onClick={doLogin}>
              Login
            </Button>
          </div>
        </Form>
      </Card>
      <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title  className="text-success">Success</Modal.Title>
              </Modal.Header>
              <Modal.Body>Login successfully!</Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            {showSpinner && (
              <div className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(255,255,255,0.6)', zIndex: 1050 }}>
                <Spinner animation="border" variant="primary" />
              </div>
            )}
    </div>
  );
};

export default Login;
