import React, { useEffect } from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from './redux/slices/authSlice';
import SignInForm from './components/signin';
import SignUpForm from './components/signup';
import Home from './components/Home';
// import Schools from './components/Schools';
// import Courses from './components/Courses';
// import LessonStatistics from './components/LessonStatistics';
// import SchoolDetails from './components/SchoolDetails';
// import CourseDetails from './components/CourseDetails';
// import AddCourses from './components/AddCourses';
// import DeleteCourses from './components/DeleteCourses';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
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
              <Route path="/*" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              {/* <Route path="/schools" element={<Schools />} />
              <Route path="schools/:schoolId/courses" element={<Courses />} />
              <Route path="schools/:schoolId/courses/:courseId/lessons/:lessonId" element={<Lesson />} />
              <Route path="/lesson_statistics" element={<LessonStatistics />} />
              <Route path="/schools/:schoolId" element={<SchoolDetails />} />
              <Route path="/schools/:schoolId/courses/:courseId" element={<CourseDetails />} />
              <Route path="/addcourses" element={<AddCourses />} />
              <Route path="/deletecourses" element={<DeleteCourses />} /> */}
              {/* <Route path="/*" element={<Navigate to="/homepage" />} /> */}
            </>
          ) : (
            <>
              <Route path="/login" element={<SignInForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/*" element={<Home />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
