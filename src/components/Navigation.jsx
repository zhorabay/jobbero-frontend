import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCategories } from '../redux/actions/categoryActions';
import '../styles/Navbar.css';
import origin8lab from '../media/origin8lab.png';
import jobbero from '../media/jobbero.png';
import Vector from '../media/Vector.png';

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, loading, error } = useSelector((state) => state.categories.categories);
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user && user.email === 'admin@jobbero.com';

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  const handleCoursesClick = () => {
    navigate('/all-courses');
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href="/">
          <img src={origin8lab} alt="google" className="brand-img" id="brand" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              className="nav-categories custom-dropdown"
              title={(
                <span>
                  <img src={Vector} alt="Categories" className="icon-img" />
                  Categories
                </span>
              )}
              id="collapsible-nav-dropdown"
            >
              {categories && categories.map((category) => (
                <NavDropdown.Item key={category.id} className="nav-cat-dropdown">
                  <Link to={`/categories/${category.id}/courses`} className="nav-cat-title">{category.title}</Link>
                </NavDropdown.Item>
              ))}
              {isAdmin && (
              <NavDropdown.Item className="nav-cat-dropdown">
                <Link to="/categories/post-category" className="nav-cat-title">Add Category</Link>
              </NavDropdown.Item>
              )}
            </NavDropdown>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/all-courses">Courses</Nav.Link>
            <Nav.Link href="/instructors">Instructors</Nav.Link>
            <Nav.Link href="/contact-us">Contacts</Nav.Link>
          </Nav>
          <Nav>
            <Button type="button" className="nav-btn blue-nav-btn" onClick={handleCoursesClick}>Start Learning</Button>
            <Nav.Link href="https://www.jobbero.com/" eventKey={2}>
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
