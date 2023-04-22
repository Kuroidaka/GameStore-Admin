import React, { Suspense, useEffect } from 'react';
import { GlobalStyles } from './component/Global.styles';
import { Route, Routes, useLocation } from 'react-router-dom';
import Load from './component/load';
import config from './config';
import Login from './page/Login/Login';
import Register from './page/Register/Register';
import styled from 'styled-components';


function ScrollToTopOnLocationChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {

  const {login, register} = config.adminRoutePath

  return (
    <Suspense fallback={<Load/>}>
      <Container>
        <GlobalStyles />
        <ScrollToTopOnLocationChange />
      
          <Routes>
              <Route path={login} element={<Login/>} />
              <Route path={register} element={<Register /> }/>
          </Routes>
       
      </Container>
    </Suspense>
  );
}

export default App;

const Container = styled.div `
  
`