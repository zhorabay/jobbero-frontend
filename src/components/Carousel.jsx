import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CategoryCarousel = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/categories');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  return (
    <div className="category-section">
      <h2 className="category-h2">Browse Skills By Categories</h2>
      <Slider {...settings} className="carousel">
        {categories.map((category) => (
          <div key={category.id}>
            <img src={category.image} alt="category" className="category-img" />
            <h3 className="category-h3">{category.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategoryCarousel;
