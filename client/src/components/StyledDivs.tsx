import styled from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => theme.pageContainer}
`;

export const Card = styled.div`
  ${({ theme }) => theme.card};
`;
