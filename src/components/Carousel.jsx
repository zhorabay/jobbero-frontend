import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetchCategories } from '../redux/actions/categoryActions';

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

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

  return (
    <div className="category-section">
      <h2 className="category-h2">Browse Skills By Categories</h2>
      <Slider
        dots={settings.dots}
        infinite={settings.infinite}
        speed={settings.speed}
        slidesToShow={settings.slidesToShow}
        slidesToScroll={settings.slidesToScroll}
        className="carousel"
        inline
      >
        <ul className="category-list">
          {Array.isArray(categories) && categories.map((category) => (
            <li key={category.id} className="category-list-id">
              <img src={category.image} alt="category" className="category-img" />
              <h3 className="category-h3">
                <Link to={`/${category.id}/courses`} className="category-h3">
                  {category.title}
                </Link>
              </h3>
            </li>
          ))}
        </ul>
      </Slider>
    </div>
  );
};

export default CategoryCarousel;
