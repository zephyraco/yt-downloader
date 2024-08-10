import React, { useState } from 'react';
import { IntlShape } from 'react-intl';
import styled from 'styled-components';
import DropdownPopup from './DropdownPopup';
import DownloadButton from './DownloadButton';
import { VideoData } from '../types/VideoData';
import { Container, FlexContainer } from './StyledDivs';
import { downloadVideo } from '../utils/videoUtils';

interface VideoInfoProps {
  intl: IntlShape;
  videoInfo: VideoData;
  setLoading: (flag: boolean) => void;
  setError: (flag: boolean) => void;
}

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

  const handleDownload = () =>
    downloadVideo(url, selectedFormat, quality, setLoading, setError);
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
            <Label>{formatMessage({ id: 'choose_format_label' })}</Label>
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
            <Label>{formatMessage({ id: 'choose_quality_label' })}</Label>

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
        onClick={handleDownload}
        text={formatMessage({ id: 'download' })}
      />
    </>
  );
};

export default VideoInfo;
