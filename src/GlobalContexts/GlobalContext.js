import axios from 'axios';
import React, { createContext, useEffect, useReducer } from 'react';
import { useCookies } from 'react-cookie';
import { reducer } from './Reducer';

export const context = createContext(initialState);

const initialState = {
  cart: [],
  userProfile: []
}

const GlobalContext = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies('authToken');
  console.log()
  const getUserProfile = () => {
    axios.get('/api/userProfile')
      .then((res) => {
        console.log(res.data.user);
        dispatch({
          type: 'FETCH_USER_PROFILE',
          payload: res.data.user
        })
      })
      .catch((err) =>
        console.error(err)
      );
  }
  useEffect(getUserProfile, [])
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <context.Provider value={{ ...state, dispatch, getUserProfile }} >{children}</context.Provider>
  )
}

export default GlobalContext