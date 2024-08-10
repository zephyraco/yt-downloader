import React from 'react';
import { IntlShape } from 'react-intl';
import styled from 'styled-components';

interface DownloadButtonProps {
  onClick: () => Promise<void>;
  text: string;
}

const Button = styled.button`
  ${({ theme }) => theme.downloadButton}
`;

const DownloadButton: React.FC<DownloadButtonProps> = ({
  onClick,
  text,
}: DownloadButtonProps) => {
  return <Button onClick={() => onClick()}>{text}</Button>;
};

export default DownloadButton;
