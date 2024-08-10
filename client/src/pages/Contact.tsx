import React from 'react';
import { useIntl } from 'react-intl';
import { Card } from '../components/StyledDivs';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faTwitter } from '@fortawesome/fontawesome-free-brands';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { CSSProperties } from 'styled-components/dist/types';
import { theme } from '../theme/theme';
import { emailAddress, twitterURl } from '../constants/constants';
import { Link } from 'react-router-dom';

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.bismark};
`;
const Paragraph = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.white};
`;

const IconStyle: CSSProperties = {
  color: theme.colors.bismark,
  margin: '0 10px',
  cursor: 'pointer',
};

const Contact = () => {
  const { formatMessage } = useIntl();

  return (
    <main>
      <Card>
        <div style={{ overflow: 'scroll' }}>
          <header>
            <Title>
              {formatMessage({
                id: 'contact_title',
                defaultMessage: 'Contact',
              })}
            </Title>
          </header>

          <section>
            <Paragraph>
              {formatMessage({
                id: 'contact_name',
                defaultMessage: 'Zephyra Co (2024)',
              })}
            </Paragraph>
            <Paragraph>
              {formatMessage({
                id: 'contact_twitter',
                defaultMessage: 'Follow us on X:',
              })}
              <Link to={twitterURl} target="blank">
                <FontAwesomeIcon
                  icon={faTwitter as IconProp}
                  style={IconStyle}
                />
              </Link>
            </Paragraph>
            <Paragraph>
              {formatMessage({
                id: 'contact_email',
                defaultMessage: 'Connect via email:',
              })}
              <a
                href={`mailto:${emailAddress}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faGoogle as IconProp}
                  style={IconStyle}
                />
              </a>
            </Paragraph>
          </section>
        </div>
      </Card>
    </main>
  );
};

export default Contact;
