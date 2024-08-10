import styled from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => theme.pageContainer}
`;

export const Card = styled.div`
  ${({ theme }) => theme.card};
`;

export const FlexContainer = styled.div`
  ${({ theme }) => theme.flexContainer}
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.bismark};
`;
export const SubHeading = styled.h1`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.bismark};
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.white};
`;
