import React from 'react';
import styled, { CSSProperties } from 'styled-components';
import { IntlShape } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/fontawesome-free-brands';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { twitterURl } from '../constants/constants';
import { Link } from 'react-router-dom';
import { theme } from '../theme/theme';

const FooterContainer = styled.footer`
  ${({ theme }) => theme.footerContainer}
`;

const CircularContainer = styled.div`
  ${({ theme }) => theme.circularContainer};
  position: relative;
`;

const FlexContainer = styled.div`
  ${({ theme }) => theme.flexContainer}
`;

const Div = styled.div`
  color: ${({ theme }) => theme.colors.bismark};
`;

interface FooterProps {
  intl: IntlShape;
}

const iconStyle: CSSProperties = {
  display: 'flex',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)', // Add this line to center the icon horizontally
};

const Footer: React.FC<FooterProps> = (props: FooterProps) => {
  const { formatMessage } = props.intl;
  return (
    <FooterContainer>
      <FlexContainer>
        <Div>
          &copy; {new Date().getFullYear()} Zephyra.{' '}
          {formatMessage({ id: 'footer_all_rights_reserved' })}
        </Div>
        <FlexContainer>
          <CircularContainer>
            <Link to={twitterURl}>
              <FontAwesomeIcon
                icon={faTwitter as IconProp}
                style={iconStyle}
                color={theme.colors.bismark}
              />
            </Link>
          </CircularContainer>
        </FlexContainer>
      </FlexContainer>
    </FooterContainer>
  );
};

export default Footer;
