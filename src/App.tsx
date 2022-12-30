import { FC } from 'react'
import styled from 'styled-components'
import { GlobalStyles } from './component/GlobalStyles/GlobalStyles.styles'
import AdminRoutes from '~/page/Admin'

const App:FC = () => {
  return (
   <Container>
  <GlobalStyles />
  <AdminRoutes />

   </Container>
  );
}

export default App;

const Container = styled.div`
  

`