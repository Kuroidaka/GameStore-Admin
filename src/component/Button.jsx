import styled from 'styled-components'



const Button = (props)  => {
    const { 
        children,
        title,
        cancel,
        onClick,
        width,
        height,
        active = false,
        outline = false,
        disable = false,
        normal = false
    } = props



    return (
        <ButtonStyle cancel={cancel} 
                    onClick={onClick} 
                    width={width} 
                    height={height} 
                    icon={children}
                    active={active}
                    outline={outline}
                    disable={disable}
                    normal={normal}
                    >
            {children}
            {title}
        </ButtonStyle>
     );
}
 
export default Button;

const ButtonStyle = styled.button`

    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    width: ${({width}) => width};
    height: ${({height}) => height};
    border: none;
    padding: 8.8px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 5px;
    gap: 7px;
    color: white;
    font-size: 1.2rem;
    transition: all .2s ease-in-out;
    font-weight: 700;
    margin: 10px;

    &:hover {
        box-shadow: 0 0.1rem 0.5rem rgb(37 71 106 / 50%), 0 0.25rem 1rem rgb(55 60 67 / 20%);
        
    }

    ${({active}) => 
        active && 
        `background-color: var(--first-color);
            &:hover {
                box-shadow: 0 0.1rem 0.5rem rgb(37 71 106 / 50%), 0 0.25rem 1rem rgb(55 60 67 / 20%);
                background-color: #542582;
            }
        `

        
    }
    ${({outline}) => 
        outline && `
        color: var(--first-color);
        background-color: transparent; 
        border: 1px solid var(--first-color);
        `
    }
    ${({disable}) => 
        disable && `
        cursor: unset!important;
        pointer-events: none;
        box-shadow: none;
        background-color: #E4E4E4;
        color: #AFAFAF;
        `
    }

    ${({normal}) => 
        normal && `
        background-color: #F5F5F5;
        color: #313741;   
        `
    }

   
`