/* eslint-disable react-hooks/rules-of-hooks */
import {useSelector} from 'react-redux';
const token = useSelector(state => state.authReducer);
export const authHeader = `Bearer  ${token.token}`;
