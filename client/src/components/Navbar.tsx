import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IntlShape } from 'react-intl';
import { FlexContainer } from './StyledDivs';

const NavbarContainer = styled.nav`
  ${({ theme }) => theme.navbarContainer}
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

interface NavbarProps {
  intl: IntlShape;
}

const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  const { intl } = props;
  const { formatMessage } = intl;
  return (
    <NavbarContainer>
      <FlexContainer>
        <Logo>Zephyra</Logo>
        <div>{formatMessage({ id: 'nav_desc' })}</div>
      </FlexContainer>
      <NavLinks>
        <NavLink to="/">
          {formatMessage({ id: 'nav_home', defaultMessage: 'Home' })}
        </NavLink>
        <NavLink to="/about">
          {formatMessage({ id: 'nav_about', defaultMessage: 'About' })}
        </NavLink>
        <NavLink to="/contact">
          {formatMessage({ id: 'nav_contact', defaultMessage: 'Contact' })}
        </NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
