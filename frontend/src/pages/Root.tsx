import React from 'react';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <>
      <Outlet></Outlet>
    </>
  );
};

export default Root;