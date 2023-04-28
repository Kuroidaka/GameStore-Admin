import styled from "styled-components";
import Sidebar from "./Sidebar";


const SideBarLayout = (props) => {
    const { children } = props

    return ( 
        <Container className="sidebar">
            <Sidebar />
            {children}
        </Container>
    );
}
 
export default SideBarLayout;

const Container = styled.div `

`