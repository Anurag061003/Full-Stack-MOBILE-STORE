import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Button, Modal } from 'react-bootstrap'
import { deleteMobile } from './features/cart/cartSlice'
import 'bootstrap-icons/font/bootstrap-icons.css'
const ShoppingCart = () => {
  let { products } = useSelector((state) => state.cart)
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [totalCost, setTotalCost] = useState(0)
  let [showCart, setShowCart] = useState(false)
  let [showModal, setShowModal] = useState(false)
  function gotoCheckOutPage() {
    let token;
    token = localStorage.getItem('token')
    if (token) {
      navigate('/checkout')
    }
    else {
      setShowModal(true)
    }
  }
  useEffect(() => {
    if (products.length > 0) {
      setShowCart(true)
      const total = products.reduce((sum, product) => {
        const price = product.DiscountDetails.length > 0
          ? product.DiscountDetails[0].finalPrice
          : product.price
        return sum + price
      }, 0)
      setTotalCost(total)
    } else {
      setShowCart(false)
      setTotalCost(0)
    }
  }, [products])

  const handleDelete = (id) => {
    dispatch(deleteMobile(id))
  }
  return (
    <>
      <Container>
        <Row>
          <h1 className='mt-2'>Shopping Cart !</h1>
          {showCart &&
            <table className='table'>
              <thead>
                <tr>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Original Price</th>
                  <th>Discount</th>
                  <th>Final Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) =>
                  <tr>
                    <td><img src={product.image} width="40px" height="40px" /></td>
                    <td>{product.mobileName}</td>
                    <td>{product.price}</td>
                    <td>{product.DiscountDetails.length > 0 ? product.DiscountDetails[0].discountValue : "-"}</td>
                    <td>{product.DiscountDetails.length > 0 ? product.DiscountDetails[0].finalPrice : product.price}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(product._id)}
                      >Remove
                        {/* <i className="bi bi-trash"></i> */}
                      </Button>

                    </td>
                  </tr>
                )
                }
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Total Cost</td>
                  <td>{totalCost}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>}
          <div className="text-end mt-2">{
            showCart && <Button size='sm' style={{ width: "20%" }} onClick={gotoCheckOutPage}>Check-out</Button>
          }</div>
          {
            !showCart &&
            <>
              <hr />
              <h3 className='text-danger d-flex'>No Product here to display...</h3>
            </>
          }
        </Row>
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please login first to continue to checkout.</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={() => {
            setShowModal(false);
            window.dispatchEvent(new Event('open-login-modal'))
          }}>
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ShoppingCart
