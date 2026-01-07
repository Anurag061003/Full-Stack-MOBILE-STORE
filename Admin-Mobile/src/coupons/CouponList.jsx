import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
const apiUrl = import.meta.env.VITE_API_URL;

const CouponList = () => {
    const navigate = useNavigate();
    let [coupons, setCoupons] = useState([])
    let [isDelete, setIsDelete] = useState(false)
    const [show, setShow] = useState(false);
    function gotoAddCouponPage() {
        navigate('/add/coupon')

    }
    const handleClose = () => {
        setShow(false)
        setIsDelete(true);
    }
    function gotoDelete(id) {
        axios({
            url: apiUrl+`/delete/coupon/` + id,
            method: "delete",
        }).then((result) => {
            if (result.data.success) {
                setShow(true)
            }
        }).catch((err) => {
            alert(err)
        })

    }
    function gotoEdit(id) {
         navigate(`/edit/coupon/${id}`)
    }
    useEffect(() => {
        axios({
            url: apiUrl+'/coupons',
            method: 'get'
        }).then((result) => {
            console.log(result.data.data);
            setCoupons(result.data.data || [])
        }).catch((err) => {
            console.log(err)
        })
    }, [isDelete])
    return (<>
        <button className="btn btn-success ms-3 mt-3 float-end" onClick={gotoAddCouponPage}>Add Coupon+</button>
        <table className='table'>
            <thead>
                <tr>
                    <th>Coupon Name</th>
                    <th>Applied On</th>
                    <th>Mobile Brand</th>
                    <th>Original Price</th>
                    <th>Coupon Code</th>
                    <th>Final Price</th>
                    <th>Actions</th>
                </tr>

            </thead>
            <tbody>
                {coupons.map((Coupon) => (
                    <tr key={Coupon._id}>
                        <td>{Coupon.couponName}</td>
                        <td>{Coupon.mobile?.mobileName || 'N/A'}</td>
                        <td>{Coupon.mobile?.brand || 'N/A'}</td>
                        <td>{Coupon.mobile?.price || 'N/A'}</td>
                        <td>{Coupon.couponCode}</td>
                        <td>{Coupon.mobile?.price ? Coupon.mobile.price - 2000 : 'N/A'}</td>
                        <td>
                            <i className="bi bi-pencil me-3" onClick={() => gotoEdit(Coupon._id)}></i>
                            <i className="bi bi-trash" onClick={() => gotoDelete(Coupon._id)}></i>
                        </td>
                    </tr>
                ))}
            </tbody>

        </table>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>Coupon has been Deleted successfully!</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>);
}

export default CouponList
