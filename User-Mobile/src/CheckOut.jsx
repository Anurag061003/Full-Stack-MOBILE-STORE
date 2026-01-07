import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button ,Modal} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import {loadStripe} from '@stripe/stripe-js'
import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;
const CheckOut = () => {
  let { products } = useSelector((state) => state.cart)
  let [totalCost, setTotalCost] = useState(0)
  let [firstName, setFirstName] = useState('')
  let [lastName, setLastName] = useState('')
  let [email, setEmail] = useState('')
  let [mobileNo, setMobileNo] = useState('')
  let [addressLine1, setAddressLine1] = useState('')
  let [addressLine2, setAddressLine2] = useState('')
  let [city, setCity] = useState('')
  let [state, setState] = useState('')
  let [country, setCountry] = useState('')
  let [zipCode, setZipCode] = useState('')
  const [modalShow, setModalShow] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalMessage, setModalMessage] = useState('')

  const handleShowModal = (title, message) => {
    setModalTitle(title)
    setModalMessage(message)
    setModalShow(true)
  }
  useEffect(() => {
    let name=localStorage.getItem('name')
    let customerEmail=localStorage.getItem('email')
    setFirstName(name)
    setEmail(customerEmail)
    let sum = 0;
    totalCost = 0;
    for (let i = 0; i < products.length; i++) {
      sum = products[i].DiscountDetails.length > 0 ? products[i].DiscountDetails[0].finalPrice : products[i].price;
      totalCost = totalCost + sum
    }
    setTotalCost(totalCost)
  }, [])
  async function goToBuy() {
    let token;
    token = localStorage.getItem('token')
     if (token) {
    let data ={
    firstName: firstName,
    lastName: lastName,
    email: email,
    mobileNo: mobileNo,
    addressLine1: addressLine1,
    addressLine2: addressLine2,
    city: city,
    state: state,
    country: country,
    zipCode: zipCode,
    }
   const stripe=await loadStripe(process.env.STRIPE_Public_KEY)
   let tokenSend='Bearer'+' '+localStorage.getItem('token')
   const headers={
    'Content-Type':'application/json',
    authorization:tokenSend  
   }
   let cart=[];
   for(let i=0;i<products.length;i++){
      cart.push(products[i])
   }
    let body={
      products:cart,
      data:data
    }
    axios({
      url:apiUrl+'/checkout',
      method:'post',
      data:body,
      headers:headers
    }).then((res)=>{
      window.location.href=res.data.data
       
    }).catch((err)=>{
      handleShowModal('Error', 'Something went wrong while processing payment.')
      console.log(err)
    })
  }else{
     handleShowModal('Authentication Required', 'Please login first to continue.')
  }
  }

  return (
    <>
    <Container>
      <Row>
        <Col>
          <h3 className="mt-3">Checkout Details</h3>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" name="firstName" value={firstName}readOnly />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name="lastName" onChange={(e) => setLastName(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={email}readOnly />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="tel" name="phone" onChange={(e) => setMobileNo(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Address Lane1</Form.Label>
              <Form.Control type="text" name="address" onChange={(e) => setAddressLine1(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address Lane2</Form.Label>
              <Form.Control type="text" name="address" onChange={(e) => setAddressLine2(e.target.value)} />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" name="city" onChange={(e) => setCity(e.target.value)} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control type="text" name="state" onChange={(e) => setState(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control type="text" name="country" onChange={(e) => setCountry(e.target.value)} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control type="text" name="zip" onChange={(e) => setZipCode(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col>
          <h3 className='mt-3'>Product Summery !</h3>
          <table className='table'>
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Final Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) =>
                <tr>
                  <td><img src={product.image} width="40px" height="40px" /></td>
                  <td>{product.mobileName}</td>
                  <td>{product.DiscountDetails.length > 0 ? product.DiscountDetails[0].finalPrice : product.price}</td>
                </tr>
              )
              }
              <tr>
                <td></td>
                <td>Total Cost</td>
                <td>{totalCost}</td>
              </tr>
            </tbody>
          </table>
          <div className='text-end'>
            <Button variant="success" style={{width:"25%"}} onClick={goToBuy}>
              Place Order
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
     <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  )
}
export default CheckOut
