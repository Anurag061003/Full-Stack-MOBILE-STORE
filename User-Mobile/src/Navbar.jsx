import Container from "react-bootstrap/Container";
import { Nav, Navbar, Form, Button ,Badge,Modal} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { BiLogOut } from "react-icons/bi";
import Profile_Icon from './assets/Profile_Icon.png'
function NavBar() {
  let[show,setShow]=useState(true)
  let [showLoginModal, setShowLoginModal] = useState(false)
  let [isloggedIn, setIsloggedIn] = useState(false)
  let [userName, setUserName] = useState('')
  let [showSuccessModal, setShowSuccessModal] = useState(false)
  let navigate = useNavigate();
  let { products } = useSelector((state) => state.cart)
  useEffect(() => {
    let token;
    token = localStorage.getItem('token')
    if (token) {
      setIsloggedIn(true)
      setUserName(localStorage.getItem('name'))
    }
    // Listen for event from other components
  const handleOpenLogin = () => setShowLoginModal(true)
  window.addEventListener('open-login-modal', handleOpenLogin)

  // Cleanup
  return () => window.removeEventListener('open-login-modal', handleOpenLogin)

  }, [])
   function handleSuccessClose() {
      setShowSuccessModal(false);
   }
  function doLogout() {
    localStorage.setItem('name', '')
    localStorage.setItem('email', '')
    localStorage.setItem('token', '')
    setIsloggedIn(false)
     setShowSuccessModal(true)
     setShow(false)
    navigate('/')
  }
  return (
    <>
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      className="shadow-lg py-3"
      style={{ background: "linear-gradient(90deg, #1a1a1a, #343a40)" }}
    >
      <Container fluid className="px-4">
        
        <Navbar.Brand
          href="#home"
          className="fw-bold fs-4 text-warning"
          style={{ letterSpacing: "1px" }}
        >
          RD Mobile Store
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link
              onClick={()=>navigate('/')} 
              className="text-light mx-2 nav-link-hover"
            >
              Mobile
            </Nav.Link>

            <Nav.Link
              href="/my/orders"
              onClick={()=>navigate('/my/orders')}
              className="text-light mx-2 nav-link-hover"
            >
              My Orders
            </Nav.Link>

            <Nav.Link
               href="/about/us"
              onClick={()=>navigate('/about/us')}
              className="text-light mx-2 nav-link-hover"
            >
             About Us
            </Nav.Link>

          </Nav>
          <Nav.Link  onClick={()=>navigate('/cart')}className="text-white me-3" style={{position:"relative"}}>
               <i className="bi bi-cart" style={{fontSize:'1.3rem'}}></i>
              <Badge bg="danger" pill style={{
                position:"absolute", top:"0px", right:"-8px", fontSize:"0.7rem"
              }}>{products.length>0? products.length:''}</Badge>
              </Nav.Link>

          {
              isloggedIn && <span className="fw-bold fs-4 text-danger  me-3 "> Welcome {userName} !
                <img src={Profile_Icon} alt="Profile" className="ms-2"
                  style={{
                    width: "40px", height: "40px", borderRadius: "10%", objectFit: "cover",
                  }} />
              </span>
            }
            
            <Form className="d-flex align-items-center me-2">
              {!isloggedIn &&

                <>
                  <Form.Control
                    type="search"
                    placeholder="Search mobiles..."
                    className="rounded-pill px-3 me-2 border-0"
                    style={{ width: "300px" }}
                  />
                  <Button
                    variant="warning"
                    className="rounded-pill fw-semibold"
                  >
                    Search
                  </Button>
                </>}
              {
                isloggedIn &&
                <div className="text-center ms-3" style={{ cursor: "pointer" }} onClick={doLogout} title="Logout">
                  <BiLogOut size={30} style={{ color: 'white', display: 'block', margin: '0 auto' }} className="logout-icon" />
                  <div style={{ color: 'white', fontWeight: '700', fontSize: '15px', marginTop: '4px' }}>
                    Logout
                  </div>
                </div>
              }
              {!isloggedIn &&
                <Button variant="success" className=" ms-2 rounded-pill fw-semibold" onClick={() => setShowLoginModal(true)}>
                  Login
                </Button>}
            </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
     {showLoginModal&&<Login></Login>}
       <Modal show={showSuccessModal} onHide={handleSuccessClose}>
            <Modal.Header >
               <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>LogOut successfully!</Modal.Body>
            <Modal.Footer>
               <Button variant="danger" onClick={handleSuccessClose}>
                  Close
               </Button>
            </Modal.Footer>
         </Modal>
     </>
  );
}

export default NavBar;
