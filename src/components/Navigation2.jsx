import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css';
import origin8lab2 from '../media/origin8lab2.png';
import signin from '../media/signin.png';
import { useNavigate } from 'react-router-dom';

function Navigation2() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/all-courses');
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar2">
      <Container>
        <Navbar.Brand href="/">
          <img src={origin8lab2} alt="origin8lab2" className="brand-img" id="brand" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/course" className="signin-nav-link">Courses</Nav.Link>
            <Nav.Link href="/forum" className="signin-nav-link-1">Forum</Nav.Link>
            <Button type="button" className="nav-btn" onClick={handleClick}>Start Learning</Button>
          </Nav>
          <Nav>
            <Nav.Link href="/login" eventKey={2}>
              <img src={signin} alt="signin" className="brand-img" id="brand" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation2;
