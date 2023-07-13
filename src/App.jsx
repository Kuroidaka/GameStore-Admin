import React, { Fragment, Suspense, useEffect } from 'react';
import { GlobalStyles } from './GlobalStyle/Global.styles';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Load from './component/load';
import config from './config';
import styled from 'styled-components/macro';

import AdminManagementPage from './page/Account/Account';

import GameManage from './page/GameManage/GameManage';
import HeaderLayout from './Layout/MainLayout';
import Auth from './page/Auth/Auth';
import Dashboard from './page/Dashboard/main';
import Order from './page/Order/Order';
import CreateOrder from './page/Order/CreateOrder/CreateOrder';
import { AuthProvider } from './Context/Auth.context';
import AddGame from './page/GameManage/AddGame/AddGame';
import GameDetail from './page/GameManage/GameDetail/GameDetail';
import CustomerManage from './page/CustomerManage/CustomerManage';
import CustomerDetail from './page/CustomerManage/Component/CustomerDetail';

function ScrollToTopOnLocationChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {

  const { auth, admin, gameManage, dashboard, order, createOrder, addGame, gameDetail, customerManage } = config.adminRoutePath
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
    <AuthProvider>
      <Container>
        <GlobalStyles />
        <ScrollToTopOnLocationChange />
          <Routes>
              {token ? (
                <Fragment>
                  <Route path={dashboard} element={<HeaderLayout><Dashboard/></HeaderLayout>} />
                  <Route path={admin} element={<HeaderLayout><AdminManagementPage/></HeaderLayout>} />
                  <Route path={gameManage} element={<HeaderLayout><GameManage/></HeaderLayout>} />
                  <Route path={customerManage} element={<HeaderLayout><CustomerManage/></HeaderLayout>} />
                  <Route path={`${customerManage}/:id`} element={<HeaderLayout><CustomerDetail/></HeaderLayout>} />
                  <Route path={order} element={<HeaderLayout><Order/></HeaderLayout>} />
                  <Route path={createOrder} element={<HeaderLayout><CreateOrder/></HeaderLayout>} />
                  <Route path={addGame} element={<HeaderLayout><AddGame/></HeaderLayout>} />
                  <Route path={`${gameDetail}/:id`} element={<HeaderLayout><GameDetail/></HeaderLayout>} />
                </Fragment>
              ) : (
                <Route path={auth} replace element={<Auth/>} />
              )
              }
          </Routes>
      </Container>
    </AuthProvider>

  );
}

export default App;

const Container = styled.div `

`