import React from 'react';
import styled from 'styled-components';

const StyledOption = styled.div`
  ${({ theme }) => theme.styledOption}
  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

const Popup = styled.div`
  ${({ theme }) => theme.popup}
`;

interface DropdownPopupProps {
  isVisible: boolean;
  options: string[];
  setOption: (option: string) => void;
  setVisibility: (flag: boolean) => void;
}

const DropdownPopup = (props: DropdownPopupProps) => {
  const { isVisible, options, setOption, setVisibility } = props;
  const handleClick = (option: string) => {
    setOption(option);
    setVisibility(false);
  };
  return (
    isVisible && (
      <>

        <Popup>
          {options.map((option, index) => (
            <StyledOption key={index} onClick={() => handleClick(option)}>
              {option}
            </StyledOption>
          ))}
        </Popup>
      </>
    )
  );
};

export default DropdownPopup;
