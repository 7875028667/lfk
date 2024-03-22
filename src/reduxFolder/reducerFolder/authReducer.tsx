const initialState = {
  token: '',
};
const authReducer = (
  state = initialState,
  action: {type: any; payload: any},
) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
