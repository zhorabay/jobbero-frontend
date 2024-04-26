const initialState = {
  selectedCourseId: null,
};

const selectedCourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_COURSE_ID':
      return {
        ...state,
        selectedCourseId: action.payload,
      };
    default:
      return state;
  }
};

export default selectedCourseReducer;
