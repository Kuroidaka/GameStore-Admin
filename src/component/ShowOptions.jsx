import React, { useState } from "react";
import styled from "styled-components";
import { FiChevronDown } from "react-icons/fi";

const ShowOptions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All Game");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <OptionsContainer>
      <OptionsText>Show:</OptionsText>
      <DropdownContainer>
        <DropdownText onClick={toggleDropdown}>{selectedOption}</DropdownText>
        <DropdownIcon>
          <FiChevronDown />
        </DropdownIcon>
        {isOpen && (
          <DropdownMenu>
            <DropdownMenuItem onClick={() => handleMenuItemClick("PC")}>
              PC
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMenuItemClick("PlayStation")}>
              PlayStation
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMenuItemClick("Xbox")}>
              Xbox
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMenuItemClick("Nintendo")}>
              Nintendo
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMenuItemClick("Mobile")}>
              Mobile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMenuItemClick("VR")}>
              VR
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMenuItemClick("Other")}>
              Other
            </DropdownMenuItem>
          </DropdownMenu>
        )}
      </DropdownContainer>
    </OptionsContainer>
  );
};

export default ShowOptions;

const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const OptionsText = styled.div`
  font-size: 1.5rem;
  color: #666666;
  margin-right: 1rem;
`;

const DropdownContainer = styled.div`
  position: relative;
  background-color: #ffffff;
  width: 120px;
  margin-right: 1rem; /* Updated */
`;

const DropdownText = styled.div`
  font-size: 1.3rem;
  color: #333333;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
`;

const DropdownIcon = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px;
  padding: 0.5rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DropdownMenuItem = styled.div`
  font-size: 1.3rem;
  color: #333333;
  padding: 0.3rem 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #eaeaea;
  }
`;
