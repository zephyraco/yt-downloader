import React from 'react';
import { useIntl } from 'react-intl';
import { Card, Container } from '../components/StyledDivs';

const About = () => {
  const { formatMessage } = useIntl();

  return (
    <Container>
      <main>
        <Card>
          <div>
            <header>
              <h1>
                {formatMessage({
                  id: 'about_title',
                })}
              </h1>
            </header>

            <section>
              <h2>
                {formatMessage({
                  id: 'about_intro',
                })}
              </h2>
              <p>
                {formatMessage({
                  id: 'about_description',
                  defaultMessage:
                    'Our website provides a simple and efficient way to download YouTube videos directly to your device. Whether you want to save your favorite music videos, tutorials, or any other content, our tool allows you to do so quickly and easily. We support various formats and qualities to ensure you get the best experience.',
                })}
              </p>
            </section>

            <section>
              <h2>
                {formatMessage({
                  id: 'about_features',
                  defaultMessage: 'Key Features',
                })}
              </h2>
              <ul>
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
              </ul>
            </section>

            <section>
              <h2>
                {formatMessage({
                  id: 'about.support',
                  defaultMessage: 'Need Help?',
                })}
              </h2>
              <p>
                {formatMessage({
                  id: 'about.supportDescription',
                  defaultMessage:
                    'If you have any questions or need assistance, please visit our Contact page or reach out to our support team. We are here to help you with any issues or concerns you may have.',
                })}
              </p>
            </section>

            <footer>
              <p>
                {formatMessage({
                  id: 'about.footer',
                  defaultMessage: 'Thank you for using our service!',
                })}
              </p>
            </footer>
          </div>
        </Card>
      </main>
    </Container>
  );
};

export default About;
