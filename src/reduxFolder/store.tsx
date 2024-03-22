/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
const store = configureStore({
  reducer: rootReducer,
});

export default store;
