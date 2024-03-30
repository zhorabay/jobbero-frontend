import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import '../styles/Navbar.css';
import origin8lab from '../media/origin8lab.png';
import jobbero from '../media/jobbero.png';

function Navigation() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img src={origin8lab} alt="google" className="brand-img" id="brand" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Categories" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Full-Stack</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Frontend</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Backend</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#features">Home</Nav.Link>
            <Nav.Link href="#pricing">Courses</Nav.Link>
            <Nav.Link href="#pricing">Instructors</Nav.Link>
            <Nav.Link href="#pricing">Forum</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Start Learning</Nav.Link>
            <Nav.Link to="https://www.jobbero.com/" eventKey={2} href="#memes">
              Powered By:
              <img src={jobbero} alt="google" className="brand-img" id="brand" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
