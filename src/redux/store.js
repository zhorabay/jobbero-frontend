import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import categoryReducer from './reducers/categoryReducer';
import courseModuleReducer from './reducers/courseModuleReducer';
import courseReducer from './reducers/courseReducer';
import reviewReducer from './reducers/reviewReducer';
import lessonReducer from './reducers/lessonReducer';
import commentReducer from './reducers/commentReducer';
import cartReducer from './reducers/cartReducer';
import searchReducer from './reducers/searchReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    categories: categoryReducer,
    courses: courseReducer,
    modules: courseModuleReducer,
    reviews: reviewReducer,
    lesson: lessonReducer,
    comment: commentReducer,
    cart: cartReducer,
    search: searchReducer,
  },
  // other store configurations
});

export default store;
