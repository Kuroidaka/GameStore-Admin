import { FC, ReactNode } from "react";
import styled  from "styled-components";

interface ModalTemplatePropType {
    width: string 
    height: string 
    color: string
    children: ReactNode
}

interface ModalTemplateStylePropType extends ModalTemplatePropType{}

const ModalTemplate:FC<ModalTemplatePropType> = (props) => {
    const {width, height, color, children } = props

    return ( 
        <Container > 
            <Layout />
            <Modal width={width} height={height} color={color}>
                {children}
            </Modal>


        </Container>
    );
}
 
export default ModalTemplate;


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    


`

const Layout = styled.div`
    cursor: pointer;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(16 16 16 / 20%);
`

const Modal = styled.div<ModalTemplateStylePropType>`
    position: fixed;
    background-color: ${({color}) => color};
    width: ${({width}) => width};
    height: ${({height}) => height};
    border-radius: 10px;
    overflow: hidden;
`