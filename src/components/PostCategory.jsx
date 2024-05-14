import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { postCategory } from '../redux/actions/categoryActions';
import '../styles/Post.css';
import Navigation3 from './Navigation3';

class PostCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      image: '',
      successMessage: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      successMessage: '',
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, image } = this.state;
    try {
      // eslint-disable-next-line react/destructuring-assignment
      await this.props.postCategory({ title, image });
      this.setState({
        title: '',
        image: '',
        successMessage: 'Category created successfully',
      });
      setTimeout(() => {
        this.setState({ successMessage: '' });
      }, 3000);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  }

  render() {
    const { title, image, successMessage } = this.state;
    return (
      <>
        <Navigation3 />
        <div className="post-category-container">
          <h2>Post Category</h2>
          {successMessage && <p>{successMessage}</p>}
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="title" value={title} onChange={this.handleChange} placeholder="Category Title" required />
            <input type="text" name="image" value={image} onChange={this.handleChange} placeholder="Image URL" required />
            <button type="submit">Submit</button>
          </form>
          <Link to="/">Go to Home</Link>
        </div>
      </>
    );
  }
}

PostCategory.propTypes = {
  postCategory: PropTypes.func.isRequired,
};

export default connect(null, { postCategory })(PostCategory);
