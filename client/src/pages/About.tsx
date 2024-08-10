import React from 'react';
import { useIntl } from 'react-intl';
import { Card, Paragraph, SubHeading, Title } from '../components/StyledDivs';
import styled from 'styled-components';

const List = styled.ul`
  list-style-type: disclosure-closed;
  padding: 0 15px;
  margin-bottom: 1rem;
`;

const About = () => {
  const { formatMessage } = useIntl();

  return (
    <main>
      <Card>
        <div style={{ overflow: 'scroll' }}>
          <header>
            <Title>
              {formatMessage({
                id: 'about_title',
                defaultMessage: 'About us',
              })}
            </Title>
          </header>

          <section>
            <SubHeading>
              {formatMessage({
                id: 'about_intro',
                defaultMessage: 'Welcome to Our YouTube Video Downloader!',
              })}
            </SubHeading>
            <Paragraph>
              {formatMessage({
                id: 'about_description',
                defaultMessage:
                  'Our website provides a simple and efficient way to download YouTube videos directly to your device. Whether you want to save your favorite music videos, tutorials, or any other content, our tool allows you to do so quickly and easily. We support various formats and qualities to ensure you get the best experience.',
              })}
            </Paragraph>
          </section>

          <section>
            <SubHeading>
              {formatMessage({
                id: 'about_features',
                defaultMessage: 'Key Features',
              })}
            </SubHeading>
            <List>
              <li>
                {formatMessage({
                  id: 'about_feature1',
                  defaultMessage:
                    'Download videos in multiple formats including MP4, WEBM, and more.',
                })}
              </li>
              <li>
                {formatMessage({
                  id: 'about_feature2',
                  defaultMessage:
                    'Choose from various quality options to match your needs.',
                })}
              </li>
              <li>
                {formatMessage({
                  id: 'about_feature3',
                  defaultMessage:
                    'Simple and user-friendly interface for a hassle-free experience.',
                })}
              </li>
              <li>
                {formatMessage({
                  id: 'about_feature4',
                  defaultMessage:
                    'No registration or software installation required.',
                })}
              </li>
            </List>
          </section>

          <section>
            <SubHeading>
              {formatMessage({
                id: 'about_support',
                defaultMessage: 'Need Help?',
              })}
            </SubHeading>
            <Paragraph>
              {formatMessage({
                id: 'about_supportDescription',
                defaultMessage:
                  'If you have any questions or need assistance, please visit our Contact page or reach out to our support team. We are here to help you with any issues or concerns you may have.',
              })}
            </Paragraph>
          </section>

          <footer>
            <Paragraph>
              {formatMessage({
                id: 'about_footer',
                defaultMessage: 'Thank you for using our service!',
              })}
            </Paragraph>
          </footer>
        </div>
      </Card>
    </main>
  );
};

export default About;
