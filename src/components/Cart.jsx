import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Navigation3 from './Navigation3';
import '../styles/Course.css';
import about1 from '../media/about1.png';
import { removeFromCart } from '../redux/actions/cartActions';

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCartItems = JSON.parse(sessionStorage.getItem('cartItems'));
    if (storedCartItems) {
      dispatch({ type: 'SET_CART_ITEMS', payload: storedCartItems });
    }

    return () => {
      sessionStorage.removeItem('cartItems');
    };
  }, [dispatch]);

  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemoveFromCart = (courseId) => {
    dispatch(removeFromCart(courseId));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);

  return (
    <>
      <Navigation3 />
      <div className="courses-container">
        <div className="cart-flex">
          <div className="cart-lists">
            <h2 className="cart-h2">Shopping Cart</h2>
            <ul className="cart-list-ul">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-list-item-li">
                  <img src={about1} alt="course" className="cart-img" />
                  <div className="cart-list-details">
                    <h3 className="cart-h3">{item.title}</h3>
                    <p className="cart-hours">
                      Total Hours:
                      {item.duration}
                    </p>
                    <Button type="button" onClick={() => handleRemoveFromCart(item.id)} className="cart-remove">Remove</Button>
                  </div>
                  <p className="cart-price">
                    $
                    {item.price}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <hr className="cart-hr" />
          <div className="cart-total">
            <h2 className="cart-h2">Total:</h2>
            <p className="cart-total-price">
              $
              {totalPrice.toFixed(2)}
            </p>
            <Button type="button" href="/registration" className="make-payment-btn">Pay</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
