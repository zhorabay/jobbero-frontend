import React from 'react';
import Button from 'react-bootstrap/Button';
import about1 from '../media/about1.png';
import '../styles/Course.css';
import Navigation3 from './Navigation3';

function Cart() {
  return (
    <>
      <Navigation3 />
      <div className="courses-container">
        <div className="cart-flex">
          <div className="cart-lists">
            <h2 className="cart-h2">Shopping Cart</h2>
            <div className="cart-list-info">
              <img src={about1} alt="course" className="cart-img" />
              <div className="cart-list-details">
                <h3 className="cart-h3">Virtual Assistant Fundamentals Course</h3>
                <p className="cart-hours">Total Hours:</p>
                <Button type="button" className="cart-remove">Remove</Button>
              </div>
              <p className="cart-price">$32</p>
            </div>
          </div>
          <hr className="cart-hr"/>
          <div>
            <h2 className="cart-h2">Total:</h2>
            <p className="cart-total-price">$32</p>
            <Button>Make a Payment</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
