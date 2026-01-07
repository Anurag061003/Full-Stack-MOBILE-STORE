import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button, Modal, Spinner } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const CouponEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState({
    couponCode: "",
    couponName: "",
    discountType:"",
    validFrom: "",
    validTo: "",
    mobile: "",
  });

  const [mobiles, setMobiles] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axios({
      url: apiUrl+`/edit/coupon/${id}`,
      method: "get",
    })
      .then((res) => {
        const data = res.data.data;

        // Fill all fields properly
        setCoupon({
         couponCode: data.couponCode,
         couponName:data.couponName,
          discountType: data.discountType,
          validFrom: data.validFrom,
          validTo: data.validTo,
          mobile: data.mobile?._id || "",
        });

        setSelectedOption({
          value: data.mobile?._id,
          label: data.mobile?.mobileName,
        });

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    axios({
      url: apiUrl+"/mobiles",
      method: "get",
    })
      .then((res) => {
        const opts = res.data.data.map((m) => ({
          value: m._id,
          label: m.mobileName,
        }));
        setOptions(opts);
        setMobiles(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    setCoupon({ ...coupon, mobile: selected.value });
  };

  const handleClose = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      url: apiUrl+`/update/coupon/${id}`,
      method: "put",
      data: coupon,
    })
      .then((res) => {
        setServerMessage("Coupon updated successfully!");
        setShowModal(true);
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <Form>
        {/* Select Mobile */}
        <Form.Group>
          <Form.Label>Select the Mobile to apply Coupon</Form.Label>
          <Select
            options={options}
            value={selectedOption}
            onChange={handleChange}
            isSearchable
            placeholder="Search or Select Mobile"
          />
        </Form.Group>
        <Row>
             <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Coupon Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Coupon Name"
                value={coupon.couponName}
                onChange={(e) =>
                  setCoupon({ ...coupon, couponName: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Coupon Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Coupon Code"
                value={coupon.couponCode}
                onChange={(e) =>
                  setCoupon({ ...coupon, couponCode: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
            <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Select Discount Type</Form.Label>
              <Form.Select
                aria-label="Discount Type"
                value={coupon.discountType}
                onChange={(e) =>
                  setCoupon({ ...coupon, discountType: e.target.value })
                }
              >
                <option value="Fixed">Fixed</option>
                <option value="Percentage">Percentage</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Valid From</Form.Label>
              <Form.Control
                type="date"
                value={coupon.validFrom ? coupon.validFrom.split("T")[0] : ""}
                onChange={(e) =>
                  setCoupon({ ...coupon, validFrom: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Valid To</Form.Label>
              <Form.Control
                type="date"
                value={coupon.validTo ? coupon.validTo.split("T")[0] : ""}
                onChange={(e) =>
                  setCoupon({ ...coupon, validTo: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="success" onClick={handleSubmit}>
          Edit
        </Button>
         <Button variant="danger" className="ms-3" onClick={()=>{navigate('/coupons')}}>
          Cancel
        </Button>
      </Form>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{serverMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => navigate("/coupons")}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CouponEdit;
