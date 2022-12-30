import { FC, ReactNode } from "react";
import styled from 'styled-components'

interface ButtonPropTypes {
    icon?: string
    title: string
    children?: ReactNode
    cancel?: Boolean
    handleOnClick?: () => void
    width?: string
    height?: string
    radius?: string
    color?: string
}

interface ButtonStylePropTypes {
    cancel?: Boolean
    handleOnClick?: () => void
    width?: string
    height?: string
    icon?: ReactNode
    radius?: string
    color?: string
}

const Button:FC<ButtonPropTypes> = (props)  => {
    const { children, title, cancel, handleOnClick, width, height, radius, color } = props



    return (
        <ButtonStyle cancel={cancel} 
                    onClick={handleOnClick} 
                    width={width} 
                    height={height} 
                    radius={radius} 
                    icon={children}
                    color={color}>
            {children}
            {title}
        </ButtonStyle>
     );
}
 
export default Button;

const ButtonStyle = styled.button<ButtonStylePropTypes>`

    width: ${({width}) => width};
    height: ${({height}) => height};
    border: none;
    padding: 8.8px 16px;
    display: flex;
    justify-content: ${({icon}) => icon? 'space-around' : 'center'};
    align-items: center;
    cursor: pointer;
    border-radius: ${({radius})=> radius ? radius : '5px'};
    gap: 7px;
    background-color: ${({color})=> color ? color+ '!important' : 'var(--third_admin)'};
    ${ ({cancel}) => cancel ? `   background-color: var(--cancel-button)` : `background-color: var(--third_admin)`};
    color: white;
    font-size: 1.2rem;
    transition: all .2s ease-in-out;

    &:hover {
        box-shadow: 0 0.1rem 0.5rem rgb(37 71 106 / 50%), 0 0.25rem 1rem rgb(55 60 67 / 20%);
    }
`
