import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
const App = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default App;
