import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios'
import { Container, Row, Col, Form, Button,Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addMobile} from './features/cart/cartSlice';
import Footer from './Footer.jsx'

const MobileDetail = () => {
  const params = useParams()
   let navigate = useNavigate()
  let dispatch=useDispatch()
  let [mobile,setMobile] = useState(null)
  let [pinCode, setPincode] = useState('')
  let [result, setResult] = useState({})
  let [showMessage, setShowMessage] = useState(false)
  let id = params.id
   const [modalShow, setModalShow] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [modalTitle, setModalTitle] = useState("")

  const handleShowModal = (title, message) => {
    setModalTitle(title)
    setModalMessage(message)
    setModalShow(true)
  }

  function addtoCart(){
     dispatch(addMobile(mobile))
     handleShowModal("Cart", "Mobile added to cart successfully.")
  }
  useEffect(() => {
    axios({
      url: apiUrl + '/user/mobile/' + id,
      method: 'get'
    }).then((result) => {
      setMobile(result.data.data)
    }).catch((err) => {
      alert(err)
    })
  }, [params])
  function checkPincode(id) {
    if (pinCode.length != 6) {
       handleShowModal("Invalid Pincode", "Please enter a 6-digit pincode.")
    } else {
      axios({
        url: apiUrl + '/check/pinCode/' +pinCode+'?mobileId=' + id,
        method: 'get'
      }).then((res) => {
        if (res.data.success) {
          setResult(res.data.data)
        } setShowMessage(true)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  async function doBuy(){
     let token;
    token = localStorage.getItem('token')
    if (token) {
      localStorage.setItem('mobile',JSON.stringify(mobile))
      handleShowModal("Purchase", "Now you can proceed with purchasing!")
       setTimeout(() => {
      navigate('/checkout/single')
    }, 2000) 
    }else{
       handleShowModal("Authentication Required", "Please login first to continue.")
    }
  }
  if (!mobile) {
    return <div>Loading....</div>
  }
  return (
    <>
    <Container fluid>
      <Row className='mt-3'>
        <Col lg={4}>
          <img src={mobile.image} width="300px" height="400px" className="ms-3" ></img> <br />
          <div className="d-flex mt-2">
            <button className='btn btn-warning me-2 ' style={{ width: '40%' }} onClick={doBuy}>Buy Now</button>
            <button className='btn btn-primary' style={{ width: '40%' }} onClick={addtoCart}>Add to Cart</button>
          </div>
        </Col>
        <Col lg={8}>
          <h4 style={{ color: 'grey', fontSize: '2rem' }}>{mobile.name}<span>({mobile.brand})</span></h4>
          <h5 style={{ color: 'grey' }}>{mobile.description}</h5>
          <div style={{ width: '50px', backgroundColor: 'seaGreen', borderRadius: '5px', color: 'white', paddingLeft: '10px' }}><span>{3.4}</span>
            <span style={{ marginLeft: '4px', color: 'white' }}>★</span></div>
          {mobile.DiscountDetails.length === 0 && <span style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>&#x20b9;{mobile.price}</span>}
          {mobile.DiscountDetails.length > 0 && mobile.DiscountDetails[0].discountType === "Fixed" &&
            <div><span style={{ fontWeight: 'bold', fontSize: '1.4rem' }}> &#x20b9;{mobile.DiscountDetails[0].finalPrice}</span>
              <span className='ms-2' > <s>&#x20b9;{mobile.originalPrice}</s></span>
              <span className='ms-2 px-1 ' style={{ fontWeight: 500, color: 'green', fontSize: '1.2rem' }}>&#x20b9;{mobile.DiscountDetails[0].discountValue} Off</span></div>}
          {mobile.DiscountDetails.length > 0 && mobile.DiscountDetails[0].discountType === "Percentage" &&
            <div><span style={{ fontWeight: 'bold', fontSize: '1.4rem' }}> &#x20b9;{mobile.DiscountDetails[0].finalPrice}</span>
              <span className='ms-2'> <s>&#x20b9;{mobile.price}</s></span>
              <span className='ms-2   px-1 text-green' style={{ fontWeight: 500, color: 'green', fontSize: '1.2rem' }}>&#x20b9;{mobile.DiscountDetails[0].discountValue}% Off</span></div>}
          <h6 style={{ color: 'grey', fontStyle: "italic" }}>{mobile.description}</h6>
          <h6 style={{ color: 'grey' }}>Operating System: {mobile.operatingSystem}</h6>
          <h6 style={{ color: 'grey' }}>Processor : {mobile.processor}</h6>
          <h6 style={{ color: 'grey' }}>RAM: {mobile.ram}</h6>
          <h6 style={{ color: 'grey' }}>Storage: {mobile.storage}</h6>
          <h6 style={{ color: 'grey' }}>Expandable Storage: {mobile.expandableStorage ? 'YES' : 'NO'}</h6>
          <h6 style={{ color: 'grey' }}>Battery : {mobile.battery}</h6>
          <h6 style={{ color: 'grey' }}>Camera : {mobile.camera}</h6>
          <h6 style={{ color: 'grey' }}>DisplaySize : {mobile.displaySize}</h6>
           <h6 style={{ color: 'grey' }}>5G: {mobile.is5G ? 'YES' : 'NO'}</h6>
          <h6 style={{ color: 'grey' }}>Colour : {mobile.color}</h6>
          <h6 style={{ color: 'grey' }}>Weight: {mobile.weight}</h6>
          <h6 style={{ color: 'grey' }}>Warranty : {mobile.warranty}</h6>
          <h6 style={{ color: 'grey' }}>Model: {mobile.modelNumber}</h6>
          <h6 style={{ color: 'grey' }}>Launch Year: {mobile.launchYear}</h6>
                    <h5>
            Check Availability:
            <Row>
              <Col>
                <Form.Group classname="mb-3 mt-2">
                  <Form.Control className='w-50 d-inline' style={{ border: '1px solid black' }} type="Text" placeholder="Enter PinCode" onChange={(e) => setPincode(e.target.value)} />
                  <Button className='ms-3' variant="danger" onClick={checkPincode}>Check</Button>
                  <p>{showMessage && (result.isAvailable ? <span className="text-success fw-bold">Yes, Mobile Available in {result.city} within {result.deliveryTime} days</span>
                    : <span className="text-danger fw-bold">Mobile Not Available</span>)}</p>

                </Form.Group>
              </Col>
            </Row>
          </h5>
        </Col>
      </Row>
    </Container>
    <Footer/>
    <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MobileDetail
