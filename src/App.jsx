import React, { Suspense, useEffect } from 'react';
import { GlobalStyles } from './component/Global.styles';
import { Route, Routes, useLocation } from 'react-router-dom';
import Load from './component/load';
import config from './config';
import styled from 'styled-components';
import Auth from './page/Auth/Auth';
import SideBarLayout from './layout/Sidebar.layout';
import Dashboard from './page/Dashboard/Home';


function ScrollToTopOnLocationChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {

  const { auth, dashboard } = config.adminRoutePath

  return (
    <Suspense fallback={<Load/>}>
      <Container>
        <GlobalStyles />
        <ScrollToTopOnLocationChange />
      
          <Routes>
              <Route path={auth} element={<Auth/>} />
              <Route path={dashboard} element={<SideBarLayout><Dashboard/></SideBarLayout>} />
          </Routes>
       
      </Container>
    </Suspense>
  );
}

export default App;

const Container = styled.div `

`