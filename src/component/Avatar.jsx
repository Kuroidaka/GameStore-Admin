import React from 'react';
import styled from 'styled-components/macro';
import { Avatar as TeamplateAvatar } from 'primereact/avatar';

const Avatar = (props) => {

  const { onClick, label, size = '', customSize } = props

  const handleClick = () => {
    return onClick()
  }

  return (
    <Container customSize={customSize}>
      <TeamplateAvatar size={size} className='flex-shrink-0' onClick={handleClick} label={label.toUpperCase()} style={{ backgroundColor: '#2196F3', color: '#ffffff', width: customSize, height: customSize}} shape="circle" />
    </Container>
  );
};

export default Avatar;

const Container = styled.div `

.p-avatar {
  ${({customSize}) => customSize && `width: 7rem!important; height: 7rem!important; ` }
}
`

const AvatarImage = styled.img`
  cursor: pointer;
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  max-width: 48px;
  max-height: 48px;
  min-width: 24px;
  min-height: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-left: 1rem;
`;
