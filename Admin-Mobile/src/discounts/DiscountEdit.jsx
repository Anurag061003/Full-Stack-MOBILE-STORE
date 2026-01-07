import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button, Modal, Spinner } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const DiscountEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [discount, setDiscount] = useState({
    discountName: "",
    discountType: "",
    discountValue: "",
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
      url: apiUrl+`/edit/discount/${id}`,
      method: "get",
    })
      .then((res) => {
        const data = res.data.data;

        // Fill all fields properly
        setDiscount({
          discountName: data.discountName,
          discountType: data.discountType,
          discountValue: data.discountValue,
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
    setDiscount({ ...discount, mobile: selected.value });
  };

  const handleClose = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      url: apiUrl+`/update/discount/${id}`,
      method: "put",
      data: discount,
    })
      .then((res) => {
        setServerMessage("Discount updated successfully!");
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
          <Form.Label>Select the Mobile to apply discount</Form.Label>
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
              <Form.Label>Discount Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Discount Name"
                value={discount.discountName}
                onChange={(e) =>
                  setDiscount({ ...discount, discountName: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Select Discount Type</Form.Label>
              <Form.Select
                aria-label="Discount Type"
                value={discount.discountType}
                onChange={(e) =>
                  setDiscount({ ...discount, discountType: e.target.value })
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
              <Form.Label>Discount Value</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Discount Value"
                value={discount.discountValue}
                onChange={(e) =>
                  setDiscount({ ...discount, discountValue: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Valid From</Form.Label>
              <Form.Control
                type="date"
                value={discount.validFrom ? discount.validFrom.split("T")[0] : ""}
                onChange={(e) =>
                  setDiscount({ ...discount, validFrom: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Valid To</Form.Label>
              <Form.Control
                type="date"
                value={discount.validTo ? discount.validTo.split("T")[0] : ""}
                onChange={(e) =>
                  setDiscount({ ...discount, validTo: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="success" onClick={handleSubmit}>
          Edit
        </Button>
         <Button variant="danger" className="ms-3" onClick={()=>{navigate('/discounts')}}>
          Cancel
        </Button>
      </Form>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{serverMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => navigate("/discounts")}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DiscountEdit;
