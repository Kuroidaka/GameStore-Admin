import { FC } from 'react';
import styled from 'styled-components'

interface HomeProps {

}

const Home:FC<HomeProps> = () => {
    return ( 
        <Container>
            <Content >
                <h1>Home</h1>
            </Content>
        </Container>
     );
}
 
export default Home;

const Container = styled.div`
height: calc( 100vh - var(--header-height));
width: 100%;

`

const Content = styled.div`

  
`