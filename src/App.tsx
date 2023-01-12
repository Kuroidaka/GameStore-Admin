import React, { FC, Fragment, Suspense } from 'react'
import styled from 'styled-components'
import { GlobalStyles } from './component/GlobalStyles/GlobalStyles.styles'

const AdminRoutes = React.lazy(() => import('~/page/Admin'))
const UserRoutes = React.lazy(() => import('./page/User'))

const App:FC = () => {
  return (
   <Container>
  <GlobalStyles />
        <Suspense fallback={<>Loading...</>}>
          <AdminRoutes />
          <UserRoutes />
        </Suspense>
   </Container>
  );
}

export default App;

const Container = styled.div`
  

`