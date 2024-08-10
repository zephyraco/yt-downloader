import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.nav`
  ${({ theme }) => theme.navbarContainer}
`;

const FlexContainer = styled.div`
  ${({ theme }) => theme.flexContainer}
`;

const Logo = styled.div`
  ${({ theme }) => theme.navbarLogo}
`;

const NavLinks = styled.div`
  ${({ theme }) => theme.flexContainer}
`;

const NavLink = styled(Link)`
  ${({ theme }) => theme.links};
  &:hover {
    text-decoration: none;
    transform: scale(1.1);
    color: ${({ theme }) => theme.colors.white};
  }
`;

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <FlexContainer>
        <Logo>Zephyra</Logo>
        <desc>Free Youtube Video Downloader</desc>
      </FlexContainer>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
