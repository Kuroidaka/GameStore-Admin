import React from 'react';
import styled from 'styled-components/macro';

const Avatar = () => {
  return (
    <AvatarImage
      src="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
      alt="User Avatar"
    />
  );
};

export default Avatar;

const AvatarImage = styled.img`
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
