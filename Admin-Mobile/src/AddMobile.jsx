import { Container, Row, Col, Button, Form,Modal,Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useNavigate } from 'react-router-dom';
function AddMobile() {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
    navigate('/mobiles')
  };
  let [showSpinner, setShowSpinner] = useState(false);
  let [buttonDisabled, setButtonDisabled] = useState(false)
  let [mobileName, setMobileName] = useState("");
  let [brand, setBrand] = useState("");
  let [description, setDescription] = useState("");
  let [operatingSystem, setOperatingSystem] = useState("Android");
  let [processor, setProcessor] = useState("");
  let [ram, setRam] = useState(4);
  let [storage, setStorage] = useState(64);
  let [expandableStorage, setExpandableStorage] = useState(false);
  let [battery, setBattery] = useState(4000);
  let [camera, setCamera] = useState("");
  let [displaySize, setDisplaySize] = useState(0);
  let [is5G, setIs5G] = useState(false);
  let [color, setColor] = useState("");
  let [weight, setWeight] = useState(0);
  let [price, setprice] = useState(0);
  let [quantity, setQuantity] = useState(0);
  let [warranty, setWarranty] = useState("1 Year");
  let [modelNumber, setModelNumber] = useState("");
  let [launchYear, setLaunchYear] = useState(new Date().getFullYear());
  let [file, setFile] = useState(null);
function doAddMobile() {
  let formData = new FormData();
  setButtonDisabled(true);
  setShowSpinner(true);

  formData.append('mobileName', mobileName);
  formData.append('brand', brand);
  formData.append('description', description);
  formData.append('operatingSystem', operatingSystem);
  formData.append('processor', processor);
  formData.append('ram', ram);
  formData.append('storage', storage);
  formData.append('expandableStorage', expandableStorage);
  formData.append('battery', battery);
  formData.append('camera', camera);
  formData.append('displaySize', displaySize);
  formData.append('is5G', is5G ? "true" : "false");
  formData.append('color', color);
  formData.append('weight', weight);
  formData.append('price', price);
  formData.append('quantity', quantity);
  formData.append('warranty', warranty);
  formData.append('modelNumber', modelNumber);
  formData.append('launchYear', launchYear);

  if (file){
    formData.append('file', file);
    formData.append('fileName', file.name);
  }

  axios({
    url: apiUrl+'/add/mobile',
    method: "POST",
    data: formData,
    headers: {
      'content-type': 'multipart/form-data'
    }
  })
    .then((result) => {
  setButtonDisabled(false);
  setShowSpinner(false);
  if (result.data.success) {
    setShow(true);
  }
})
    .catch((err) => {
      console.error(err);
      setButtonDisabled(false);
      setShowSpinner(false);
    });
}

  return (
    <>
      <Container fluid>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Mobile Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Mobile Name" onChange={(e)=>{setMobileName(e.target.value)}} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Brand</Form.Label>
                <Form.Control type="text" placeholder="Enter Brand Name"  onChange={(e)=>{setBrand(e.target.value)}}/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Enter Description" onChange={(e)=>{setDescription(e.target.value)}}/>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Operating System</Form.Label>
                <Form.Select defaultValue="Android" onChange={(e)=>{setOperatingSystem(e.target.value)}}>
                  <option value="Android">Android</option>
                  <option value="iOS">iOS</option>
                  <option value="Others">Others</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Processor</Form.Label>
                <Form.Control type="text" placeholder="Enter Processor" onChange={(e)=>{setProcessor(e.target.value)}}/>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>RAM (GB)</Form.Label>
                <Form.Control type="number" placeholder="Enter RAM" onChange={(e)=>{setRam(Number(e.target.value))
}} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Storage (GB)</Form.Label>
                <Form.Control type="number" placeholder="Enter Storage" onChange={(e)=>{setStorage(Number(e.target.value))
}} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Expandable Storage</Form.Label>
                <Form.Select defaultValue="No" onChange={(e)=>{setExpandableStorage(e.target.value === "true")}}>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Battery (mAh)</Form.Label>
                <Form.Control type="number" placeholder="Enter Battery" onChange={(e)=>{setBattery(Number(e.target.value))
}}/>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Camera</Form.Label>
                <Form.Control type="text" placeholder="e.g. 50MP + 8MP + 2MP"  onChange={(e)=>{setCamera(e.target.value)}}/>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Display Size (inches)</Form.Label>
                <Form.Control type="number" placeholder="Enter Display Size" onChange={(e)=>{setDisplaySize(Number(e.target.value))
}}/>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>5G Support</Form.Label>
                <Form.Select defaultValue="No" onChange={(e)=>{setIs5G(e.target.value=== "true")}}>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Color</Form.Label>
                <Form.Control type="text" placeholder="Enter Color" onChange={(e)=>{setColor(e.target.value)}}/>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Weight (grams)</Form.Label>
                <Form.Control type="number" placeholder="Enter Weight" onChange={(e)=>{setWeight(Number(e.target.value))
}}/>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Original Price</Form.Label>
                <Form.Control type="number" placeholder="Enter price" onChange={(e)=>{setprice(Number(e.target.value))
}}/>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" placeholder="Enter Quantity" onChange={(e)=>{setQuantity(Number(e.target.value))
}}/>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Warranty</Form.Label>
                <Form.Control type="text" placeholder="e.g. 1 Year" onChange={(e)=>{setWarranty(e.target.value)}} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Model Number</Form.Label>
                <Form.Control type="text" placeholder="Enter Model Number" onChange={(e)=>{setModelNumber(e.target.value)}}/>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Launch Year</Form.Label>
                <Form.Control type="number" placeholder="Enter Launch Year" onChange={(e)=>{setLaunchYear(Number(e.target.value))
}}/>
              </Form.Group>
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
          <Button variant="success" disabled={buttonDisabled} onClick={doAddMobile}>Save</Button>
        <Button  className="ms-3"  variant="danger" onClick={() => navigate('/mobiles')}>Cancel</Button>
        </Form>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Mobile has been added successfully!</Modal.Body>
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
      </Container>
    </>
  );
}

export default AddMobile;