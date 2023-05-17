import React, { Fragment, Suspense, useEffect } from 'react';
import { GlobalStyles } from './component/Global.styles';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Load from './component/load';
import config from './config';
import styled from 'styled-components';
import BookingOrder from './page/BookingOrder/BookingOrder';

const Auth = React.lazy(() => import('./page/Auth/Auth'));
const Home = React.lazy(() => import('./page/Home'));


function ScrollToTopOnLocationChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {

  const navigate = useNavigate()

  const { pathname } = useLocation()

  const { auth, dashboard, order } = config.adminRoutePath


  const token = localStorage.getItem('token')


  // useEffect(() => {
    
  //   if(token) {
  //     pathname === auth && (navigate(dashboard))
  //   }
  //   else {
  //     navigate(auth)
  //   }
  // }, []);

  return (
    <Suspense fallback={<Load/>}>
      <Container>
        <GlobalStyles />
        <ScrollToTopOnLocationChange />

          <Routes >
          
              <Route path={order} element={<BookingOrder />} />
              {/* {token ? (
                <Fragment>
                  <Route path={dashboard} element={<Home/>} />
                </Fragment>
              ) : (
                <Route path={auth} replace element={<Auth/>} />
              )

              } */}
             
          </Routes>
       
      </Container>
    </Suspense>
  );
}

export default App;

const Container = styled.div `

`