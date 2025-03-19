import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRouting = () => {
    const isAuth = JSON.parse(localStorage.getItem('loggedInUser'))
    if(!isAuth){
      return <Navigate to="/login" />
    } 
    return <Outlet />
  }