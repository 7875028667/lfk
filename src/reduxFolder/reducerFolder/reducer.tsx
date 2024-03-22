/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {CHNAGE_LANGUAGE} from '../constant';
export const reducer = (state = 'ENGLISH', action: any) => {
  switch (action.type) {
    case CHNAGE_LANGUAGE:
      return action.payload;
    default:
      return state;
  }

};



