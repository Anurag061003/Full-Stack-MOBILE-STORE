import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
const MyOrders = () => {
  let [myOrders, setMyOrders] = useState([])
  let [showReviewModal, setShowReviewModal] = useState(false)
  let [productsForReview, setProductsForReview] = useState([]);
  let [rating, setRating] = useState('')
  let [comment, setComment] = useState('')
  let [mobile, setMobile] = useState('')
  let [showSuccessModal, setShowSuccessModal] = useState(false);
  let [successMsg, setSuccessMsg] = useState("");
  let [showErrorModal, setShowErrorModal] = useState(false);
let [errorMsg, setErrorMsg] = useState("");

  const handleClose = () => {
    setShowReviewModal(false)
  }
  useEffect(() => {
    let tokensend = 'Bearer' + ' ' + localStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      authorization: tokensend
    }
    axios({
      url: apiUrl + '/my/orders',
      method: 'get',
      headers: headers
    }).then((result) => {
      setMyOrders(result.data.data)
    }).catch((err) => {
       setErrorMsg("Please login first to check your orders.");
  setShowErrorModal(true);
    })
  }, [])
  function postReview(products) {
    setShowReviewModal(true)
    productsForReview.length = 0;
    for (let i = 0; i < products.length; i++) {
      productsForReview.push({
        _id: products[i]._id,
        mobileName: products[i].mobileName
      })
    }
    console.log("productsForReview")
    setProductsForReview(productsForReview)
  }
  function submitReview() {
    let data = {
      mobile: mobile,
      comment: comment,
      rating: rating
    }
    let tokensend = 'Bearer' + ' ' + localStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      authorization: tokensend
    }
    axios({
      url: apiUrl + '/post/comment',
      method: 'post',
      data: data,
      headers: headers,
    }).then((result) => {
      if (result.data.success)
        setSuccessMsg("Your review has been submitted!");
      setShowSuccessModal(true);
      handleClose();
    }).catch((err) => {
      setSuccessMsg("Something went wrong!");
      setShowSuccessModal(true);
    }, [])
  }
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h3 >My Orders !</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>
                    Transaction Id
                  </th>
                  <th>Products</th>
                  <th>Total price</th>
                  <th>Payment By</th>
                  <th>Status</th>
                  <th>Give Reviews</th>
                </tr>
              </thead>
              <tbody>
                {myOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center fw-semibold"
                      style={{
                        backgroundColor: "#e7f3ff",
                        color: "#0d6efd",
                      }}>
                      No orders yet — Start exploring and place your first order!
                    </td>
                  </tr>
                ) : (
                  myOrders.map((myOrder) =>
                    <tr>
                      <td>
                        {(myOrder.transactionId).substring(0, 15)}
                      </td>
                      <td>{myOrder.products.map((product) =>
                        product.mobileName + " "
                      )}</td>
                      <td>{myOrder.totalPrice}</td>
                      <td>{myOrder.paymentGateway}</td>
                      <td>{myOrder.status}</td >
                      <td>Type Here..<i className='bi bi-pencil ms-2' onClick={() => postReview(myOrder.products)}></i></td>
                    </tr>)
                )
                }
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
      <Modal show={showReviewModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Give Review about this Product...!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Your Product</Form.Label>
              <Form.Select onChange={(e) => setMobile(e.target.value)}>
                <option value="">Select Product</option>
                {
                  productsForReview.map(product => (
                    <option key={product._id} value={product._id}>
                      {product.mobileName}
                    </option>
                  ))
                }
                {/* <option value="">Select Rating</option>
                     <option value="1">Very Poor</option>
                       <option value="2"> Poor</option> */}
              </Form.Select>

              <Form.Label>Write your review here!</Form.Label>
              <Form.Control
                as="textarea"
                rows={4} value={comment}
                placeholder="Write your review here..."
                onChange={(e) => setComment(e.target.value)}
              />
              <Form.Label>Give rating(out of 10) here!</Form.Label>
              <Form.Control type='Number' placeholder='Enter Rating' onChange={(e) => setRating(e.target.value)}>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={submitReview}>
            Post Review
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} >
        <Modal.Header>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          <h5 className="mt-3">{successMsg}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
  <Modal.Header>
    <Modal.Title>Login Required</Modal.Title>
  </Modal.Header>

  <Modal.Body className="text-center">
    <h5 className="text-danger">{errorMsg}</h5>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="danger" onClick={() => setShowErrorModal(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
    </>
  )
}

export default MyOrders
