import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import cart from '../media/cart.png';
import bell from '../media/bell.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css';

function Navigation1() {
  const [showCurrencies, setShowCurrencies] = useState(false);
  const { t, i18n } = useTranslation();

  const handleCurrencyClick = () => {
    setShowCurrencies(!showCurrencies);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Nav>
          <NavDropdown title="USD($)" id="navbarScrollingDropdown" show={showCurrencies} onClick={handleCurrencyClick}>
            <NavDropdown.Item>Euro (€)</NavDropdown.Item>
            <NavDropdown.Item>Pound (£)</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title={t('navbar.english')} id="navbarLanguageDropdown">
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
        <Nav>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/cart">
                <img src={cart} alt="Categories" className="icon-img" />
              </Nav.Link>
              <Nav.Link href="/notifications">
                <img src={bell} alt="Categories" className="icon-img" />
              </Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation1;
