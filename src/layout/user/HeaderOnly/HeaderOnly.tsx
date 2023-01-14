import { ReactNode } from "react";
import styled from "styled-components";
import HeaderCom from "../Component/Header/Header";

interface propsType {
    children: ReactNode
}

const HeaderOnly = (props:propsType) => {
    const { children } = props

    return ( 
        <Container>
            <HeaderCom/>
            {children}
        </Container>
     );
}
 
export default HeaderOnly;

const Container = styled.div`

`