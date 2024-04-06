import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../styles/Course.css';
import Navigation3 from './Navigation3';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/courses');
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <Navigation3 />
      <div className="courses-container">
        <div className="courses-flex">
          <h2 className="courses-h2">Available Courses</h2>
          <div>
          {courses.map((course) => (
            <div key={course.id}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={course.image} />
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                  <Card.Text>{course.duration}</Card.Text>
                  <Card.Text>{course.price}</Card.Text>
                  <Button variant="primary">Add to Cart</Button>
                </Card.Body>
              </Card>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={course.image} />
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                  <Card.Text>{course.duration}</Card.Text>
                  <Card.Text>{course.price}</Card.Text>
                  <Button variant="primary">Add to Cart</Button>
                </Card.Body>
              </Card>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={course.image} />
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                  <Card.Text>{course.duration}</Card.Text>
                  <Card.Text>{course.price}</Card.Text>
                  <Button variant="primary">Add to Cart</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Courses;
