import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logoutUser } from '../redux/actions/authActions';
import cart from '../media/cart.png';
import bell from '../media/bell.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css';

function Navigation1({ userId }) {
  const dispatch = useDispatch();
  const [logoutMessage, setLogoutMessage] = useState('');
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      setLogoutMessage('Logout successful');
      window.location.reload();
    } catch (error) {
      setLogoutMessage('Logout failed');
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary nav1">
      <Container>
        <Nav>
          <NavDropdown className="nav-padding" title={t('navbar.english')} id="navbarLanguageDropdown">
            <NavDropdown.Item onClick={() => changeLanguage('en')}>
              {t('navbar.english')}
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeLanguage('fr')}>
              {t('navbar.french')}
            </NavDropdown.Item>
          </NavDropdown>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search..."
              className="me-2"
              aria-label="Search"
            />
          </Form>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto navpart2">
            {userId && (
              <>
                <Nav.Link href={`/${userId}/cart`}>
                  <img src={cart} alt="Categories" className="icon-img-nav1" />
                </Nav.Link>
                <Nav.Link href="/notifications">
                  <img src={bell} alt="Categories" className="icon-img-nav1" />
                </Nav.Link>
                <Nav.Link className="nav-padding-log" onClick={handleLogout}>Logout</Nav.Link>
                {logoutMessage && <p>{logoutMessage}</p>}
              </>
            )}
            {!userId && (
              <div className="nav-padding-log-flex">
                <Nav.Link className="nav-padding-log-2" href="/login">Login</Nav.Link>
                <Nav.Link className="nav-padding-log-2" href="/registration">Register</Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

Navigation1.propTypes = {
  userId: PropTypes.string,
};

Navigation1.defaultProps = {
  userId: null,
};

export default Navigation1;
