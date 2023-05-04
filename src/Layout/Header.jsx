import styled from "styled-components";

const HeaderLayout = (props) => {
    const { children } = props

    return ( 
        <Container>
            <Header>

            </Header>

            {children}
        </Container>

     );
}
 
export default HeaderLayout;

const Container = styled.div `
`

const Header = styled.div` 


`