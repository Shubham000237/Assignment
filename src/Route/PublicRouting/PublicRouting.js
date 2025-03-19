import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRouting = () => {
  const isAuth = JSON.parse(localStorage.getItem('loggedInUser'))
  if(isAuth){
    return <Navigate to="/home" />
  } 
  return <Outlet />
}