import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { logoutUser } from '../redux/actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css';
import origin8lab2 from '../media/origin8lab2.png';
import signin from '../media/signin.png';

function Navigation3() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutMessage, setLogoutMessage] = useState('');

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      setLogoutMessage('Logout successful');
      navigate('/');
    } catch (error) {
      setLogoutMessage('Logout failed');
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar2">
      <Container>
        <Navbar.Brand href="/">
          <img src={origin8lab2} alt="origin8lab2" className="brand-img" id="brand" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="/my-profile" eventKey={2}>
              <img src={signin} alt="signin" className="brand-img" id="brand" />
            </Nav.Link>
          </Nav>
          <Nav>
            <Button type="button" className="nav-btn" onClick={handleLogout}>Logout</Button>
            {logoutMessage && <p>{logoutMessage}</p>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation3;
