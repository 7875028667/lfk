/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {CHNAGE_LANGUAGE} from './constant';
export const changeLanguage = (language: any) => {
  return {
    type: CHNAGE_LANGUAGE,
    payload: language,
  };
};

export const setToken = (token :any) => {
  return {
    type: 'SET_TOKEN',
    payload: token,
  };
};

export const openDrawerAction = () => {
  return { type: 'OPEN_DRAWER' };
};


