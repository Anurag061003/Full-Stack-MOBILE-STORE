import React, { useEffect } from 'react'
import {Container,Form,Row,Col, Button,Modal} from 'react-bootstrap'
import { useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const apiUrl = import.meta.env.VITE_API_URL;

const AddPlace = () => {
  const navigate=useNavigate();
  const [selectedOption,setSelectedOption]=useState(null)
  let[inputValue,setInputValue]=useState('')
  let[options,setOptions]=useState([])
  let[pinCode,setPinCode]= useState('')
   let[city,setCity]= useState('')
    let[isAvailable,setIsAvailable]= useState('false')
    let[deliveryTime,setDeliveryTime]=useState('')
    let[deliveryCharges,setDeliveryCharges]=useState('')
    let[showModal,setShowModal]= useState(false);
    let[serverMessage,setServerMessage]=useState('')
    const handleClose = () => {
        setShowModal(false)
        navigate('/places')
    }
  function handleInputChange(input){
    setInputValue(input)
  }
  function handleChange(selected){
  setSelectedOption(selected)
  }
  useEffect(()=>{
    axios({
      url:apiUrl+'/mobiles/for/discount',
      method:'get'  ,
    params:{
        mobileName:inputValue
    } 
   }).then((result)=>{
    setOptions(result.data.data)

   }).catch((err)=>{
    console.log(err)
   })

  },[])
  function doAddPlace(){
   let data={
    mobile:selectedOption.value,
    pinCode:pinCode,
    city:city,
    isAvailable:isAvailable,
    deliveryTime:deliveryTime,
    deliveryCharges:deliveryCharges
   }
   axios({
    url:apiUrl+'/add/place',
    method:'post',
    data:data
   }).then((result)=>{
    if(result.data.success){
      setServerMessage(result.data.message)
      setShowModal(true);
    }
   }).catch((err)=>{
    setServerMessage(err.response.data.message)
      setShowModal(true);
   })
  }
  return (
    <>
    <h1>Add Place for Delivery the Mobile</h1>
    <Container>
      <Form>
        <Form.Group>
          <Form.Label>Select the Mobile For placing Delivery</Form.Label>
          <Select
          options={options}
          value={selectedOption}
          onChange={handleChange}
          isSearchable={true}
          placeholder="Search or Select a mobile" 
          onInputChange={handleInputChange}   
          >
        
      </Select>
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>PinCode</Form.Label>
              <Form.Control type="number" placeholder="Enter PinCode" onChange={(e)=>{setPinCode(e.target.value)}} />
            </Form.Group>
          </Col>
            <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Enter City</Form.Label>
              <Form.Control type="text" placeholder="Enter City" onChange={(e)=>{setCity(e.target.value)}} />
            </Form.Group>
          </Col>
        </Row>
         <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Is Available</Form.Label>
              <Form.Select aria-level="Is Available" onChange={(e) => setIsAvailable(e.target.value)}>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Delivery Time</Form.Label>
              <Form.Control type="number"onChange={(e)=>{setDeliveryTime(e.target.value)}} />
            </Form.Group>
          </Col>
      </Row>
      <Row>
           <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Delivery Charges</Form.Label>
              <Form.Control type="number"onChange={(e)=>{setDeliveryCharges(e.target.value)}} />
            </Form.Group>
          </Col>
          </Row>
      <Button variant='success' onClick={doAddPlace}>Add Place</Button>
      <Button  className="ms-3"  variant='danger' onClick={()=>navigate('/places')}>Cancel</Button>
      </Form>
      <Modal show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>{serverMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> 
    </Container>
    </>
  )
}

export default AddPlace