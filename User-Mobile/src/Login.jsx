import React, { useState } from 'react'
import { Modal, Form, Button, Spinner, Alert } from 'react-bootstrap'
import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;
const Login = () => {
   let [show, setShow] = useState(true);
   let [login, setLogin] = useState(true);
   let [signup, setSignup] = useState(false)
   let [firstName, setFirstName] = useState('');
   let [lastName, setLastName] = useState('');
   let [signUpEmail, setSignUpEmail] = useState('')
   let [signUpPassword, setSignUpPassword] = useState('');
   let [loginEmail, setLoginEmail] = useState('')
   let [loginPassword, setLoginPassword] = useState('')
   let [showOTPContent, setShowOTPContent] = useState(false);
   let [otpSend, setOtpSend] = useState(0);
   let [otpEntered, setOtpEntered] = useState(0);
   let [showSuccessOTPmessage, setShowSuccessOTPmessage] = useState(false)
   let [showFailedOTPmessage, setShowFailedOTPmessage] = useState(false)
   let [disableSignupButton, setDisableSignupButton] = useState(true)
   let [loadingOTP, setLoadingOTP] = useState(false);
   let [loadingSignup, setLoadingSignup] = useState(false);
   let [loadingLogin, setLoadingLogin] = useState(false);
   const [showSignupSuccessModal, setShowSignupSuccessModal] = useState(false);

   function doSignUp() {
      setLoadingSignup(true);
      let data = {
         firstName: firstName,
         lastName: lastName,
         email: signUpEmail,
         password: signUpPassword
      }
      axios({
         url: apiUrl + '/add/user',
         method: 'post',
         data: data
      }).then((result) => {
         setLoadingSignup(false);
         if (result.data.success) {
            setShow(false); 
            setShowSignupSuccessModal(true);
            setTimeout(() => {
               setShowSignupSuccessModal(false);
               showLoginModal();
            }, 2000);
         } else {
            showLoginModal();
         }
      }).catch((err) => {
         setLoadingSignup(false);
         alert('error')
      })
   }


   function handleclose() {
      setShow(false);
   }
   function showSignupModal() {
      setLogin(false)
      setSignup(true)
      setShow(true)
   }
   function showLoginModal() {
      setLogin(true)
      setSignup(false)
      setShow(true)
   }
   function sendOTP() {
      setLoadingOTP(true);
      let data = {
         email: signUpEmail
      }
      axios({
         url: apiUrl + '/send/otp/for/signup',
         method: 'post',
         data: data
      }).then((result) => {
         setLoadingOTP(false);
         if (result.data.success) {
            setShowOTPContent(true)
            setOtpSend(result.data.data)
         }

      }).catch((err) => {
         alert('error')
      })
   }
   function verifyOTP() {
      if (parseInt(otpSend) === parseInt(otpEntered)) {
         setShowSuccessOTPmessage(true)
         setShowOTPContent(false)
         setDisableSignupButton(false)
      } else {
         setShowFailedOTPmessage(true)
      }
   }
   function doLogin() {
      setLoadingLogin(true)
      let data = {
         email: loginEmail,
         password: loginPassword
      }
      axios({
         url: apiUrl + '/user/login',
         method: 'post',
         data: data
      }).then((result) => {
         setLoadingLogin(false)
         if (result.data.success) {
            localStorage.setItem('name', result.data.data.name)
            localStorage.setItem('email', result.data.data.email)
            localStorage.setItem('token', result.data.data.token)
            setShow(false)
            window.location.reload()
         }
      }).catch((err) => {
         setLoadingLogin(false)
         alert('error')
      })
   }
   return (
      <>
         {loadingSignup && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
               <Spinner animation="border" variant="light" style={{ width: '3rem', height: '3rem' }} />
               <span className="text-light ms-3 fs-5">Processing your signup...</span>
            </div>
         )}
         <Modal show={show} onHide={handleclose}>
            <Modal.Header>
               <Modal.Title>{login ? 'Login' : 'Sign Up'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {login &&
                  <Form>
                     <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Type Email here' onChange={(e) => setLoginEmail(e.target.value)}></Form.Control>
                     </Form.Group>
                     <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter Password' onChange={(e) => setLoginPassword(e.target.value)}></Form.Control>
                     </Form.Group>
                     <Button className='mt-2' variant='success' onClick={doLogin} disabled={loadingLogin}>
                        {loadingLogin ? (
                           <>
                              <Spinner animation="border" size="sm" className="me-2" />
                              Logging in...
                           </>
                        ) : (
                           "Login"
                        )}
                     </Button>
                     <p>Do you have an account ? <span className='ms-2 text-danger' style={{ cursor: 'pointer' }} onClick={showSignupModal}>Sign up</span></p>
                  </Form>
               }
               {signup &&
                  <Form>
                     <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type='Text' placeholder='Type First Name here' onChange={(e) => setFirstName(e.target.value)}></Form.Control>
                     </Form.Group>
                     <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type='Text' placeholder='Type Last Name here' onChange={(e) => setLastName(e.target.value)}></Form.Control>
                     </Form.Group>
                     <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Type Email here' onChange={(e) => setSignUpEmail(e.target.value)}></Form.Control>
                     </Form.Group>
                     {!showOTPContent && (
                        <Button className='mt-2' variant='success' onClick={sendOTP}>
                           {loadingOTP ? (
                              <Spinner animation="border" size="sm" className="me-2" />
                           ) : null}
                           {loadingOTP ? 'Sending OTP...' : 'Verify Email'}
                        </Button>
                     )}
                     {
                        showOTPContent &&
                        <Form.Group>
                           <p className='text-success  fw-bold'>OTP has been send on your email.</p>
                           <Form.Label>Enter OTP</Form.Label>
                           <Form.Control type='Text' placeholder='Type OTP here' onChange={(e) => setOtpEntered(e.target.value)}></Form.Control>
                           <Button className='mt-2' variant='warning' onClick={verifyOTP}>Verify OTP</Button>
                        </Form.Group>
                     }
                     {showSuccessOTPmessage && <span className='text-success'>
                        <Alert> ✅ OTP verified successfully!</Alert></span>}
                     {showFailedOTPmessage && <span className='text-danger'>
                        <Alert>❌ Incorrect OTP, please try again.</Alert></span>}
                     <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter Password' onChange={(e) => setSignUpPassword(e.target.value)}></Form.Control>
                     </Form.Group>
                     <Button className='mt-2' variant='success' onClick={doSignUp} disabled={disableSignupButton}>SignUp</Button>
                     <p>Already have an account?<span className='ms-2 text-danger ' onClick={showLoginModal}>Login</span></p>
                  </Form>
               }
            </Modal.Body>
         </Modal>
         <Modal show={showSignupSuccessModal} onHide={() => setShowSignupSuccessModal(false)}>
            <Modal.Header >
               <Modal.Title>Sign Up Successful</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <p>✅ You have signed up successfully!</p>
            </Modal.Body>
         </Modal>

      </>
   )
}

export default Login
