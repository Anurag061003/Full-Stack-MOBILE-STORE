import React from 'react'
import { useEffect } from 'react'
import { Modal,Button ,Spinner,Form} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios'
import { useState } from 'react'
const apiUrl = import.meta.env.VITE_API_URL;
export default function MobileList() {
    let navigate =useNavigate();
    const [show, setShow] = useState(false);
let [mobiles,setMobiles]=useState([]);
let[isDelete,setIsDelete]=useState(false)
 let[showSpinner,setShowSpinner]=useState(false);
 let [searchByMobileName,setSearchByMobileName]=useState("")
    useEffect(()=>{
        axios({
            url:apiUrl+'/mobiles'
           
            ,method:'get',
             params:{
              mobileName:searchByMobileName
            }
        }).then((result)=>{
            if(result.data.success){
                setMobiles(result.data.data)
            }

        }).catch((err)=>{
            console.log(err)
        })
    },[isDelete,searchByMobileName])
    function gotoAddMobile(){
        navigate('/add/mobile')
    }
    function searchMobile( mobilename){
       setSearchByMobileName(mobilename) 

    }
    const handleClose = () => {
    setShow(false)
    setIsDelete(prev => !prev);    
  }
    function gotoDelete(id){
        setShowSpinner(true);
         axios({
           url: apiUrl+`/delete/mobile/`+id,
           method:'delete'
        }).then((result)=>{
      if(result.data.success){
        setShow(true);
      }
    })
    .catch((err)=>{
      console.error(err);
    }).finally(()=>{
      // Always hide spinner after request finishes
      setShowSpinner(false);
    });
    }
    function gotoEdit(id){
      navigate('/edit/mobile/'+id)
    
    }
     function gotoView(id){
       navigate('/mobile/detail/'+id)

    }
  return (
    <>
          <Form.Control type="text" placeholder="Enter Mobile Name To Search" onChange={(e)=> searchMobile(e.target.value)}/>
    <button className='btn btn-success ms-4 mt-3 float-end' onClick={gotoAddMobile}>AddMobile +</button>
        <table className='table'>
            <thead>
                <tr >
                    <th>Mobile Image</th>
                    <th>Mobile Name</th>
                    <th>Brand </th>
                    <th>RAM</th>
                    <th>Storage</th>
                    <th>Battery</th>
                    <th>Color</th>
                    <th>Price</th>
                    <th style={{ paddingLeft: '1rem' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    mobiles.map((mobile)=>
                        <tr key={mobile._id}>
                            <td><img src={mobile.image} width="40px" height="40px"/></td>
                            <td>{mobile.mobileName}</td>
                             <td>{mobile.brand}</td>
                              <td>{mobile.ram}</td>
                               <td>{mobile.storage}</td>
                               <td>{mobile.battery}</td>
                               <td>{mobile.color}</td>
                               <td>{mobile.price}</td>
                                <td >
                                    <i className="bi bi-pencil me-3" onClick={()=>gotoEdit(mobile._id)}></i>
                                    <i className="bi bi-trash " onClick={()=>gotoDelete(mobile._id)}></i>
                                    <i className="bi bi-eye ms-2 " onClick={()=>gotoView(mobile._id)}></i>
          
                                </td>

                        </tr>
                    )
                }
            </tbody>
        </table>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>    Mobile has been Deleted successfully!</Modal.Body>
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
    </>
  )
}
