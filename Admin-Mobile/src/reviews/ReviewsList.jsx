import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'

const apiURL = import.meta.env.VITE_API_URL

const ReviewsList = () => {
  const [reviews, setReviews] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedReview, setSelectedReview] = useState(null)

  useEffect(() => {
    axios({
      url: apiURL + '/admin/reviews',
      method: 'get',
    })
      .then((res) => {
        if (res.data.success) {
          setReviews(res.data.data)
        }
      })
      .catch((err) => {
        alert('Error loading reviews')
        console.log(err)
      })
  }, [])

  const openDeleteModal = (review) => {
    setSelectedReview(review)
    setShowDeleteModal(true)
  }

  const deleteReview = (id) => {
    axios({
      url: apiURL + `/admin/delete/reviews/${id}`,
      method: 'delete',
    })
      .then(() => {
        setReviews((prev) => prev.filter((r) => r._id !== id))
        setShowDeleteModal(false)
        setSelectedReview(null)
      })
      .catch((err) => {
        alert(err)
      })
  }

  const viewReview = (review) => {
    setSelectedReview(review)
    setShowViewModal(true)
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">All Reviews</h2>

      <table className="table table-striped align-middle">
        <thead className="table-primary">
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Mobile ID</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {reviews && reviews.length > 0 ? (
            reviews.map((r) => (
              <tr key={r._id}>
                <td>{r.userName}</td>
                <td>{r.userEmail}</td>
                <td>{r.mobileId}</td>
                <td>{r.rating || 'N/A'}</td>
                <td>{r.comment?.substring(0, 30)}...</td>
                <td>
                  <i
                    className="bi bi-eye me-3 text-primary"
                    style={{ cursor: 'pointer' }}
                    title="View"
                    onClick={() => viewReview(r)}
                  ></i>
                  <i
                    className="bi bi-trash text-danger"
                    style={{ cursor: 'pointer' }}
                    title="Delete"
                    onClick={() => openDeleteModal(r)}
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No reviews found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header >
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this review?
        </Modal.Body>
        <Modal.Footer>
          <Button  onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteReview(selectedReview._id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Modal */}
      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        centered
      >
        <Modal.Header>
          <Modal.Title>Review Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReview && (
            <>
              <p><b>User:</b> {selectedReview.userName}</p>
              <p><b>Email:</b> {selectedReview.userEmail}</p>
              <p><b>Mobile ID:</b> {selectedReview.mobileId}</p>
              <p><b>Rating:</b> {selectedReview.rating || 'N/A'}</p>
              <p><b>Comment:</b> {selectedReview.comment}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ReviewsList
