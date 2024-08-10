import React, { useState } from 'react';
import { IntlShape } from 'react-intl';
import styled from 'styled-components';
import DropdownPopup from './DropdownPopup';
import DownloadButton from './DownloadButton';

export interface VideoData {
  info: any;
  title: string;
  thumbnail: string;
  availableFormats: string[]; // Update the type to string[]
  qualityOptions: string[]; // Update the type to string[]
  author: string;
  url: string;
}

interface VideoInfoProps {
  intl: IntlShape;
  videoInfo: VideoData;
  setLoading: (flag: boolean) => void;
  setError: (flag: boolean) => void;
}

const FlexContainer = styled.div`
  ${({ theme }) => theme.flexContainer};
`;

const FlexColumn = styled.div`
  ${({ theme }) => theme.flexColumn}
`;

const Title = styled.div`
  font-weight: 300;
  font-size: 1.1rem;
  margin: 3px 0;
`;
const Description = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.light_grey};
  margin: 3px 0;
`;

const StyledSelect = styled.div`
  ${({ theme }) => theme.styledSelect}
`;

const ImageContainer = styled.img`
  ${({ theme }) => theme.imageContainer}
`;

const Label = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.white};
  margin: 10px auto 10px 0;
`;

const VideoInfo: React.FC<VideoInfoProps> = (props: VideoInfoProps) => {
  const { intl, videoInfo, setLoading, setError } = props;
  const { formatMessage } = intl;
  const { title, thumbnail, availableFormats, qualityOptions, author, url } =
    videoInfo;
  const [formatOptionsVisible, setFormatOptionsVisible] = useState(false);
  const [qualityOptionsVisible, setQualityOptionsVisible] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState(availableFormats[0]);
  const [quality, setQuality] = useState(qualityOptions[0]);

  const handleDownload = async (
    url: string,
    format: string,
    quality: string
  ) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        url: encodeURI(url),
        format: format,
        quality: quality,
      });

      const response = await fetch(`http://localhost:5050/download?${params}`);
      if (!response.ok) {
        throw new Error('Failed to download video');
      }

      const contentDisposition = response.headers.get('Content-Disposition');
      const fileNameMatch =
        contentDisposition && contentDisposition.match(/filename="(.+)"/);
      const fileName = fileNameMatch ? fileNameMatch[1] : 'downloaded-video';
      console.log('res', response);
      setLoading(false);
      const blob = await response.blob();

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error('Error downloading video:', error);
    }
  };
  return (
    <>
      <FlexContainer>
        <FlexColumn>
          <ImageContainer src={thumbnail} alt="Thumbnail" />
        </FlexColumn>
        <FlexColumn>
          <Title>{title}</Title>
          <Description>{author}</Description>
          <FlexContainer>
            <Label>Choose Format:</Label>
            <StyledSelect
              id="format"
              onClick={() => setFormatOptionsVisible(!formatOptionsVisible)}
            >
              {selectedFormat}
            </StyledSelect>

            <DropdownPopup
              isVisible={formatOptionsVisible}
              options={availableFormats}
              setOption={setSelectedFormat}
              setVisibility={setFormatOptionsVisible}
            />
          </FlexContainer>
          <FlexContainer>
            <Label>Choose quality:</Label>

            <StyledSelect
              id="quality"
              onClick={() => setQualityOptionsVisible(!qualityOptionsVisible)}
            >
              {quality}
            </StyledSelect>

            <DropdownPopup
              isVisible={qualityOptionsVisible}
              options={qualityOptions}
              setOption={setQuality}
              setVisibility={setQualityOptionsVisible}
            />
          </FlexContainer>
        </FlexColumn>
      </FlexContainer>
      <Description>{formatMessage({ id: 'video_format_note' })}</Description>
      <DownloadButton
        onClick={() => handleDownload(url, selectedFormat, quality)}
        text={formatMessage({ id: 'download' })}
      />
    </>
  );
};

export default VideoInfo;
