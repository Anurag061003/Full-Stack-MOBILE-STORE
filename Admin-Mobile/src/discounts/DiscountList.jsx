import React from 'react'
import { Modal,Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect,useState } from 'react'
const apiUrl = import.meta.env.VITE_API_URL;

const DiscountList = () => {
    const navigate = useNavigate();
    let[discounts,setDiscounts]= useState([])
    let[isDelete,setIsDelete]=useState(false)
    const [show, setShow] = useState(false);
    function gotoAddDiscountPage(){
        navigate('/add/discount')

    }
     const handleClose = () => {
    setShow(false)
    setIsDelete(true); 
  }
  function gotoDelete(id){
        axios({
            url: apiUrl+`/delete/discount/`+id,
            method:"delete",
        }).then((result)=>{
            if(result.data.success){
                setShow(true)
            }
        }).catch((err)=>{
            alert(err)
        })

    }
    function gotoEdit(id){
        navigate(`/edit/discount/${id}`)
    }
  useEffect(()=>{
     axios({
        url:apiUrl+'/discounts',
        method:'get'
     }).then((result)=>{
       setDiscounts(result.data.data)
     }).catch((err)=>{
        console.log(err)
     })
    },[isDelete])
    return ( <>
     <button className="btn btn-success ms-3 mt-3 float-end" onClick={gotoAddDiscountPage}> Add Discount+</button>
     <table className='table'>
        <thead>
            <tr>
               <th>Discount Name</th>
            <th>Applied On</th>
            <th>Mobile Brand</th>
            <th>Original Price</th>
            <th>Discount Type</th>
            <th>Discount Value</th>
            <th>Final Price</th> 
            <th>Actions</th> 
            </tr>
           
        </thead>
       <tbody>
  {discounts.map((discount) => (
    <tr key={discount._id}>
      <td>{discount.discountName}</td>
      <td>{discount.mobile?.mobileName || 'N/A'}</td>
      <td>{discount.mobile?.brand || 'N/A'}</td>
      <td>{discount.mobile?.price || 'N/A'}</td>
      <td>{discount.discountType}</td>
      <td>{discount.discountValue}</td>
      <td>{discount.finalPrice}</td>
      <td>
        <i className="bi bi-pencil me-3" onClick={() => gotoEdit(discount._id)}></i>
        <i className="bi bi-trash" onClick={() => gotoDelete(discount._id)}></i>
      </td>
    </tr>
  ))}
</tbody>

     </table>
     <Modal show={show} onHide={handleClose}>
             <Modal.Header>
               <Modal.Title>Success</Modal.Title>
             </Modal.Header>
             <Modal.Body>Discount has been Deleted successfully!</Modal.Body>
             <Modal.Footer>
               <Button variant="danger" onClick={handleClose}>
                 Close
               </Button>
             </Modal.Footer>
           </Modal>
    </> );
}

export default DiscountList
