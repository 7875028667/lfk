const initialState = {
  isDrawerOpen: false,
};
const openDrawerRedux = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_DRAWER':
      return {
        ...state,
        isDrawerOpen: true,
      };
    default:
      return state;
  }
};
export default openDrawerRedux;
