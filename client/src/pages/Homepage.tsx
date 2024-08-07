import React from 'react';
import { HomepageProps } from '../types/HomepageProps';

import styled from 'styled-components';

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.main};
`;

const HomePage = (props: HomepageProps) => {
  const { formatMessage } = props.intl;
  return (
    <div>
      <Title>{formatMessage({ id: 'homepage.title' })}</Title>
    </div>
  );
};

export default HomePage;
