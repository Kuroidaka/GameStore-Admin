import React, { Fragment, Suspense, useEffect } from 'react';
import { GlobalStyles } from './component/Global.styles';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Load from './component/load';
import config from './config';
import styled from 'styled-components/macro';

import AdminManagementPage from './page/Account/Account';

import GameManage from './page/GameManage/GameManage';
import HeaderLayout from './Layout/MainLayout';
import Auth from './page/Auth/Auth';
import Home from './page/Home';


function ScrollToTopOnLocationChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {

  const { auth, admin, gameManage, dashboard } = config.adminRoutePath
  const navigate = useNavigate()

  const { pathname } = useLocation()

  const token = localStorage.getItem('token')


  useEffect(() => {
    
    if(token) {
      pathname === auth && (navigate(dashboard))
    }
    else {
      navigate(auth)
    }
  }, []);

  return (
      <Container>
        <GlobalStyles />
        <ScrollToTopOnLocationChange />
          <Routes>
              {token ? (
                <Fragment>
                  <Route path={dashboard} element={<HeaderLayout><Home/></HeaderLayout>} />
                  <Route path={admin} element={<HeaderLayout><AdminManagementPage/></HeaderLayout>} />
                  <Route path={gameManage} element={<HeaderLayout><GameManage/></HeaderLayout>} />
                </Fragment>
              ) : (
                <Route path={auth} replace element={<Auth/>} />
              )
              }
          </Routes>

      </Container>

  );
}

export default App;

const Container = styled.div `

`