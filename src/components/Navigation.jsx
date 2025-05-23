import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCategories, deleteCategory } from '../redux/actions/categoryActions';
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
  const isLoggedIn = !user;

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
    navigate('/registration');
  };

  const handleClickHome = () => {
    navigate('/');
  };

  const handleClickCourse = () => {
    navigate('/all-courses');
  };

  const handleClickInstructors = () => {
    navigate('/instructors');
  };

  const handleClickContacts = () => {
    navigate('/contact-us');
  };

  const handleAddCategoryClick = () => {
    navigate('/categories/post-category');
  };

  const handleEditCategoryClick = (categoryId) => {
    navigate(`/categories/edit-category/${categoryId}`);
  };

  const handleDeleteCategoryClick = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      dispatch(deleteCategory(categoryId));
    }
  };

  const renderAdminOptions = (category) => {
    if (isAdmin) {
      return (
        <>
          <Button type="button" className="edit-button" onClick={() => handleEditCategoryClick(category.id)}>
            Edit
          </Button>
          <Button type="button" className="edit-button" onClick={() => handleDeleteCategoryClick(category.id)}>
            Delete
          </Button>
        </>
      );
    }
    return null;
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href="/">
          <img src={origin8lab} alt="google" className="brand-img-nav" id="brand" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              className="nav-categories custom-dropdown"
              title={(
                <span className="nav-categories-font">
                  <img src={Vector} alt="Categories" className="icon-img" />
                  Categories
                </span>
              )}
              id="collapsible-nav-dropdown"
            >
              {categories && categories.map((category) => (
                <NavDropdown.Item key={category.id} className="nav-cat-dropdown">
                  <Link to={`/categories/${category.id}/courses`} className="nav-cat-title">{category.title}</Link>
                  {renderAdminOptions(category)}
                </NavDropdown.Item>
              ))}
              {isAdmin && (
                <button type="button" className="add-category" onClick={handleAddCategoryClick}>
                  Add Category
                </button>
              )}
            </NavDropdown>
            <button type="button" className="handle-click-nav" onClick={handleClickHome}>Home</button>
            <button type="button" className="handle-click-nav" onClick={handleClickCourse}>Courses</button>
            <button type="button" className="handle-click-nav" onClick={handleClickInstructors}>Instructors</button>
            <button type="button" className="handle-click-nav" onClick={handleClickContacts}>Contacts</button>
          </Nav>
          <Nav>
            {isLoggedIn && (
              <Button type="button" className="nav-btn blue-nav-btn" onClick={handleCoursesClick}>Start Learning</Button>
            )}
            <Nav.Link href="https://www.jobbero.com/" eventKey={2}>
              Powered By:
              <img src={jobbero} alt="google" className="jobbero-img" id="brand" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
