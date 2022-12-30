
import { FC, forwardRef, RefAttributes } from 'react';
import styled from 'styled-components'

interface AvatarPropTypes {
    src : string
    width: string
    ref ?:React.LegacyRef<HTMLImageElement> | undefined
}

interface AvatarStylePropTypes {
    width: string
}



const Avatar:FC<AvatarPropTypes & RefAttributes<HTMLImageElement>> = forwardRef((props , ref ) => {
    const {src, width} = props

    return ( 
        <Wrap width={width} >
            <img src={src} ref={ref} alt="" />
        </Wrap>
     );
})
 
export default Avatar;

const Wrap = styled.div<AvatarStylePropTypes>`

cursor: pointer;
flex-shrink: 0;
border-radius: 50%;
${ ({width}) => width && `width: ${width}; height: ${width};`}
overflow: hidden;
border: 1px solid var(--avatar-wrap);
background-color: var(--primary_admin);
display: flex;
justify-content: center;
align-items: center;

img{
    width: 100%;
    height: 100%;
}
`