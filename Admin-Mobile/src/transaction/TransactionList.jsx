import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'
const apiURL = import.meta.env.VITE_API_URL;

const TransactionList = () => {
  let [transactions, setTransaction] = useState([])
  let [showDeleteModal, setShowDeleteModal] = useState(false)
  let [showViewModal, setShowViewModal] = useState(false)
  let [selectedTxn, setSelectedTxn] = useState(null)

  useEffect(() => {
    axios({
      url: apiURL + '/admin/transactions',
      method: 'get',
    }).then((res) => {
      setTransaction(res.data.data)
    }).catch((err) => {
      alert(err)
    })

  }, [])
  const openDeleteModal = (txn) => {
    setSelectedTxn(txn)
    setShowDeleteModal(true)
  }
  const deleteTransaction = (id) => {
    if (!selectedTxn) return
    axios({
      url: apiURL + `/admin/delete/transactions/${id}`,
      method: 'delete',
    })
      .then((res) => {
        setTransaction((prev) => prev.filter((txn) => txn._id !== id))
        setShowDeleteModal(false)
        setSelectedTxn(null)
      })
      .catch((err) => {
        alert(err)
      })
  }

  const viewTransaction = (txn) => {
    setSelectedTxn(txn)
    setShowViewModal(true)
  }
  return (
    <div className="container mt-4">
    <>   
        <h2 className="mb-3">All Transactions</h2>
      <table className="table table-striped align-middle">
        <thead className="table-primary">
          <tr>
            <th>Transaction ID</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>City</th>
            <th>Products</th>
            <th>Status</th>
            <th>TotalPrice</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {transactions && transactions.length > 0 ? (
            transactions.map((txn) => (
              <tr key={txn._id}>
                <td>{txn.transactionId.substring(0, 15)}</td>
                <td>{txn.firstName} {txn.lastName}</td>
                <td>{txn.email}</td>
                <td>{txn.mobileNo || '-'}</td>
                <td>{txn.city || '-'}</td>
                <td>
                  {txn.products.map((product) =>
                    product.mobileName +" ")}
                </td>
                <td>{txn.status}</td>
                <td>{txn.totalPrice}</td>
                <td>
                  <i
                    className="bi bi-eye me-3 text-primary"
                    title="View"
                    style={{ cursor: 'pointer' }}
                    onClick={() => viewTransaction(txn)}
                  ></i>
                  <i
                    className="bi bi-trash text-danger"
                    title="Delete"
                    style={{ cursor: 'pointer' }}
                    onClick={() => openDeleteModal(txn)}
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center text-muted">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this transaction?
        </Modal.Body>
        <Modal.Footer>
          <Button  onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => deleteTransaction(selectedTxn._id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="mm" centered>
        <Modal.Header>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTxn && (
            <>
              <p><b>Customer:</b> {selectedTxn.firstName} {selectedTxn.lastName}</p>
              <p><b>Email:</b> {selectedTxn.email}</p>
              <p><b>Mobile:</b> {selectedTxn.mobileNo}</p>
              <p><b>City:</b> {selectedTxn.city}</p>
              <p><b>Status:</b> {selectedTxn.status}</p>
              <p><b>Total:</b> ₹{selectedTxn.totalPrice}</p>

              <b>Products:</b>
              <ul>
                {selectedTxn.products.map((p, i) => (
                  <li key={i}>{p.mobileName}</li>
                ))}
              </ul>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    </div>
  )
}

export default TransactionList
