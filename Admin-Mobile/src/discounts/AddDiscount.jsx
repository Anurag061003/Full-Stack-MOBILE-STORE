import React, { useEffect } from 'react'
import {Container,Form,Row,Col, Button,Modal} from 'react-bootstrap'
import { useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const apiUrl = import.meta.env.VITE_API_URL;
const AddDiscount = () => {
  const navigate=useNavigate();
  const [selectedOption,setSelectedOption]=useState(null)
  let[inputValue,setInputValue]=useState('')
   let[validFrom,setValidFrom]=useState('')
    let[validTo,setValidTo]=useState('')
  let[options,setOptions]=useState([])
  //const options=[{value:"$hcgbavg762366",label:"Python"}]
  let[discountName,setDiscountName]= useState('')
   let[discountType,setDiscountType]= useState('Fixed')
    let[discountValue,setDiscountValue]= useState('')
    let[showModal,setShowModal]= useState(false);
    let[serverMessage,setServerMessage]=useState('')
    const handleClose = () => {
        setShowModal(false)
        navigate('/discounts')
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
  function doAddDiscount(){
   let data={
    mobile:selectedOption.value,
    discountName:discountName,
    discountValue:discountValue,
    discountType:discountType,
     validFrom:validFrom,
    validTo:validTo
   }
   axios({
    url:apiUrl+'/add/discount',
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
    <h1>Add Discount</h1>
    <Container>
      <Form>
        <Form.Group>
          <Form.Label>Select the Mobile to apply discount</Form.Label>
          <Select
          options={options}
          value={selectedOption}
          onChange={handleChange}
          isSearchable={true}
          placeholder="Search or Select Mobile" 
          onInputChange={handleInputChange}   
          >
        
      </Select>
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Discount Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Discount Name" onChange={(e)=>{setDiscountName(e.target.value)}} />
            </Form.Group>
          </Col>
         <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Select Discount Type</Form.Label>
              <Form.Select aria-level="Discount Type" onChange={(e) => setDiscountType(e.target.value)}>
                <option value=" Fixed">Fixed</option>
                <option value="Percentage">Percentage</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
         <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Discount value</Form.Label>
              <Form.Control type="Number" placeholder="Enter Discount Value" onChange={(e)=>{setDiscountValue(e.target.value)}} />
            </Form.Group>
          </Col>
      </Row>
      <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Valid From</Form.Label>
              <Form.Control type="date"onChange={(e)=>{setValidFrom(e.target.value)}} />
            </Form.Group>
          </Col>
           <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Valid To</Form.Label>
              <Form.Control type="date"onChange={(e)=>{setValidTo(e.target.value)}} />
            </Form.Group>
          </Col>
          </Row>
      <Button variant='success' onClick={doAddDiscount}>Add Discount</Button>
      <Button  className="ms-3"  variant='danger' onClick={()=>navigate('/discounts')}>Cancel</Button>
      </Form>
      <Modal show={showModal} onHide={handleClose}>
                <Modal.Header >
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

export default AddDiscount
