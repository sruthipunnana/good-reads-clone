import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Redirecting from './Redirecting';

const UserRoute = ({ ...rest }) => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Redirecting />;
};

export default UserRoute;
