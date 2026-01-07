import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Container, Row, Col, Form, Button, Modal, Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios"
import {useNavigate} from 'react-router-dom'
const apiUrl = import.meta.env.VITE_API_URL;
function MobileEdit() {
  let navigate=useNavigate();
  let params = useParams()
  let [mobile, setMobile] = useState({})
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  // let [showSpinner,setShowSpinner] = useState(false)
  // let [buttonDisabled, setButtonDisabled] = useState(false)
  const handleClose = () => {
    setShow(false);
    navigate('/');
  }; 

  function handleChange(e) {
    let { name, value } = e.target;

  if (value === "true") value = true;
  if (value === "false") value = false;
    setMobile((prev) => {
      return {
        ...prev, [name]: value
      }
    })
  }

  function doEditMobile(id) {
    axios({
      url:apiUrl+'/edit/mobile/' + id,
      method: "put",
      data: mobile,
    })
      .then((result) => {
        if (result.data.success) {
          setShow(true);
          navigate('/mobiles')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    axios({
      url: apiUrl+'/mobile/' + params.id,
      method: "get",
    })
      .then((result) => {
        setMobile(result.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [params])
  return (
    <>
    <Container fluid>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Mobile Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Mobile Name"  onChange={handleChange} name="mobileName" value={mobile.mobileName}  />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Brand</Form.Label>
                <Form.Control type="text" placeholder="Enter Brand Name"  onChange={handleChange} name="brand" value={mobile.brand} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Enter Description"   onChange={handleChange}name="description" value={mobile.description} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Operating System</Form.Label>
                <Form.Select defaultValue="Android"   onChange={handleChange}name="operatingSystem" value={mobile.operatingSystem} >
                  <option value="Android">Android</option>
                  <option value="iOS">iOS</option>
                  <option value="Others">Others</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Processor</Form.Label>
                <Form.Control type="text" placeholder="Enter Processor"  onChange={handleChange}name="processor" value={mobile.processor} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>RAM (GB)</Form.Label>
                <Form.Control type="number" placeholder="Enter RAM" onChange={handleChange} name="ram" value={mobile.ram}  />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Storage (GB)</Form.Label>
                <Form.Control type="number" placeholder="Enter Storage"  onChange={handleChange} name="storage" value={mobile.storage}  />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Expandable Storage</Form.Label>
                <Form.Select defaultValue="No"   onChange={handleChange}name="expandableStorage" value={mobile.expandableStorage} >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Battery (mAh)</Form.Label>
                <Form.Control type="number" placeholder="Enter Battery"  onChange={handleChange}name="battery" value={mobile.battery} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Camera</Form.Label>
                <Form.Control type="text" placeholder="e.g. 50MP + 8MP + 2MP"   onChange={handleChange}name="camera" value={mobile.camera} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Display Size (inches)</Form.Label>
                <Form.Control type="number" placeholder="Enter Display Size" onChange={handleChange}name="displaySize" value={mobile.displaySize}/>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>5G Support</Form.Label>
                <Form.Select defaultValue="No" onChange={handleChange}name="is5G" value={mobile.is5G} >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Color</Form.Label>
                <Form.Control type="text" placeholder="Enter Color" onChange={handleChange}name="color" value={mobile.color}/>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Weight (grams)</Form.Label>
                <Form.Control type="number" placeholder="Enter Weight" onChange={handleChange}name="weight" value={mobile.weight}/>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Enter price" onChange={handleChange}name="price" value={mobile.price}/>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" placeholder="Enter Quantity" onChange={handleChange}name="quantity" value={mobile.quantity}/>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Warranty</Form.Label>
                <Form.Control type="text" placeholder="e.g. 1 Year" onChange={handleChange}name="warranty" value={mobile.warranty}/>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Model Number</Form.Label>
                <Form.Control type="text" placeholder="Enter Model Number" onChange={handleChange}name="modelNumber" value={mobile.modelNumber}/>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Launch Year</Form.Label>
                <Form.Control type="number" placeholder="Enter Launch Year"onChange={handleChange}name="launchYear" value={mobile.launchYear}/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col>
            <img src={mobile.image} width="300" height="300" />
          </Col>
        </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Mobile Image</Form.Label>
                <Form.Control type="file" onChange={(e)=>{setFile(e.target.files[0])}} />
              </Form.Group>
            </Col>
          </Row>
          <Button  variant="success" disabled={false} onClick={() => doEditMobile(mobile._id)}>Edit</Button>
         <Button  className="ms-3"  variant="danger" onClick={() => navigate('/mobiles')}>Cancel</Button>
         </Form>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Mobile has been  updated successfully!</Modal.Body>
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
export default MobileEdit