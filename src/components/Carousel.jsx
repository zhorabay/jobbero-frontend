import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../redux/actions/categoryActions';

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories.categories);
  const sliderRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const goToNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += sliderRef.current.offsetWidth;
    }
  };

  const goToPrevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth;
    }
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
      <div className="carousel">
        <button className="carousel-btn prev" onClick={goToPrevSlide}>
          &lt;
        </button>
        <div className="carousel-inner" ref={sliderRef}>
          {Array.isArray(categories) && categories.map((category) => (
            <div key={category.id} className="category-list-id">
              <img src={category.image} alt="category" className="category-img" />
              <h3 className="category-h3">
                <Link to={`/${category.id}/courses`} className="category-h3">
                  {category.title}
                </Link>
              </h3>
            </div>
          ))}
        </div>
        <button className="carousel-btn next" onClick={goToNextSlide}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CategoryCarousel;
