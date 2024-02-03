import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Redirecting from './Redirecting';

const UserRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Redirecting />;
};

export default UserRoute;
// Certainly! In simple terms, think of the Outlet in React Router as a designated spot where the content of nested pages or routes will be displayed.
//  It's like an empty container waiting to be filled with the content of the current route.