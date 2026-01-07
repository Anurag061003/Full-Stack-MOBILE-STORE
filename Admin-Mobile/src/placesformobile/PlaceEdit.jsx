import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Modal, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

function PlaceEdit() {
  const navigate = useNavigate();
  const params = useParams();
  const [place, setPlace] = useState({});
  const [mobiles, setMobiles] = useState([]);
  const [show, setShow] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const handleClose = () => {
    setShow(false);
    navigate("/places");
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setPlace((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function doEditDiscount(id) {
    setShowSpinner(true);

    axios({
      url: apiUrl+"/update/place/" + id,
      method: "put",
      data: place,
    })
      .then((result) => {
        setShowSpinner(false);
        if (result.data.success) {
          setShow(true);
        }
      })
      .catch((err) => {
        setShowSpinner(false);
        console.log(err);
      });
  }

  useEffect(() => {
    axios({
      url: apiUrl+"/edit/place/" + params.id,
      method: "get",
    })
      .then((result) => {
        setPlace(result.data.data);
      })
      .catch((err) => console.log(err));

    // Fetch mobiles for dropdown
    axios({
      url: apiUrl+"/mobiles",
      method: "get",
    })
      .then((result) => {
        setMobiles(result.data.data);
      })
      .catch((err) => console.log(err));
  }, [params]);
  return (
   <>
    <Container>
      <Form>
        <Form.Group>
          <Form.Label>Select the Mobile For placing Delivery</Form.Label>
          <Form.Select
                  name="mobile"
                  value={place.mobile?._id }
                  onChange={handleChange}
                >
                  <option value="">Select a Mobile</option>
                  {mobiles.map((mobile) => (
                    <option key={mobile._id} value={mobile._id}>
                      {mobile.mobileName}
                    </option>
                  ))}
                </Form.Select>
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>PinCode</Form.Label>
              <Form.Control type="number" name = "pinCode"placeholder="Enter PinCode" value={place.pinCode} onChange={handleChange} />
            </Form.Group>
          </Col>
            <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Enter City</Form.Label>
              <Form.Control type="text" name = "city" placeholder="Enter City" value={place.city} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
         <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Is Available</Form.Label>
              <Form.Select aria-level="Is Available" name = "isAvailable"value={place.isAvailable} onChange={handleChange}>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Delivery Time</Form.Label>
              <Form.Control type="number" name="deliveryTime" value={place.deliveryTime} onChange={handleChange} />
            </Form.Group>
          </Col>
      </Row>
      <Row>
           <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Delivery Charges</Form.Label>
              <Form.Control type="number" name="deliveryCharges" value={place.deliveryCharges} onChange={handleChange} />
            </Form.Group>
          </Col>
          </Row>
           <Button variant='success me-2 ' onClick={(e)=>doEditDiscount(place._id)}>Edit Place</Button>
          <Button variant='danger' onClick={()=>navigate('/places')}>Cancel</Button>
      </Form>
     <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Delivery Place has been updated successfully!</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Spinner Overlay */}
        {showSpinner && (
          <div
            className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(255,255,255,0.6)", zIndex: 1050 }}
          >
            <Spinner animation="border" variant="primary" />
          </div>
        )}
    </Container>
    </>
  )
}

export default PlaceEdit
