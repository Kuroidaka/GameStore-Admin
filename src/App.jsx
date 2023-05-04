import React, { Suspense, useEffect } from 'react';
import { GlobalStyles } from './component/Global.styles';
import { Route, Routes, useLocation } from 'react-router-dom';
import Load from './component/load';
import config from './config';
import styled from 'styled-components';
import Auth from './page/Auth/Auth';
import AdminManagementPage from './page/Account/Account';
import HeaderLayout from './Layout/Header';


function ScrollToTopOnLocationChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {

  const { auth, admin } = config.adminRoutePath

  return (
    <Suspense fallback={<Load/>}>
      <Container>
        <GlobalStyles />
        <ScrollToTopOnLocationChange />
          
          <Routes>
              <Route path={auth} element={<Auth/>} />
              <Route path={admin} element={
                <HeaderLayout>
                  <AdminManagementPage/>
                </HeaderLayout>
              } />
          </Routes>
       
      </Container>
    </Suspense>
  );
}

export default App;

const Container = styled.div `

`