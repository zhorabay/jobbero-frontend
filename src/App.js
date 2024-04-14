import React, { useEffect } from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from './redux/actions/authActions';
import SignInForm from './components/signin';
import SignUpForm from './components/signup';
import Home from './components/Home';
import EmailConfirmation from './components/EmailConfirmation';
import './i18n';
import Account from './components/Account';
import About from './components/About';
import Policy from './components/Policy';
import Courses from './components/Courses';
import Cart from './components/Cart';
import Modules from './components/Modules';
import Registration from './components/Registration';
import Payment from './components/Payment';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.id);
  console.log('appauthentication', isAuthenticated);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const userString = sessionStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    console.log('appuser', user);
    if (token && user) {
      dispatch(loginSuccess({ user, token }));
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/*" element={<Home />} />
              <Route path="/email-confirmation" element={<EmailConfirmation />} />
              <Route path="/my-profile" element={<Account />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/privacy-policy" element={<Policy />} />
              <Route path="/:categoryId/courses" element={<Courses userId={userId} />} />
              <Route path="/all-courses" element={<Courses userId={userId} />} />
              <Route path="/:userId/cart" element={<Cart />} />
              <Route path="/:categoryId/:courseId/modules" element={<Modules />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/payment" element={<Payment />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<SignInForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/*" element={<Home />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/privacy-policy" element={<Policy />} />
              <Route path="/:categoryId/courses" element={<Courses />} />
              <Route path="/all-courses" element={<Courses />} />
              <Route path="/:categoryId/:courseId/modules" element={<Modules />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
