import React, { useEffect, useState } from 'react';
import { HomepageProps } from '../types/HomepageProps';
import HeadSection from '../components/HeadSection';
import VideoInfo, { VideoData } from '../components/VideoInfo';
import InputContainer from '../components/InputContainer';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { Card, Container } from '../components/StyledDivs';

const mockVideoInfo: VideoData = {
  info: {},
  title: 'Title',
  thumbnail:
    'https://i.ytimg.com/vi/UrsmFxEIp5k/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCPOBY325gWnkx4d68F5jPHCvMLFQ',
  availableFormats: ['mp4', 'mp3'],
  qualityOptions: ['1080p', '2040p'],
  author: 'ABC',
  url: 'www.google.com',
};

const HomePage = (props: HomepageProps) => {
  const { intl } = props;
  const [showInput, setShowInput] = useState(true);
  const [videoInfo, setVideoInfo] = useState(mockVideoInfo);
  const [showInfo, setShowInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setShowInfo(!showInput);
  }, [showInput]);

  return (
    <Container>
      <HeadSection />
      <main>
        <Card>
          {loading && !error && <Loading />}
          {error && <Error />}
          {!loading && !error && showInput && (
            <InputContainer
              intl={intl}
              setShowInput={setShowInput}
              setVideoInfo={setVideoInfo}
              setLoading={setLoading}
              setError={setError}
            />
          )}
          {!loading && !error && showInfo && (
            <VideoInfo
              intl={intl}
              videoInfo={videoInfo}
              setLoading={setLoading}
              setError={setError}
            />
          )}
        </Card>
      </main>
    </Container>
  );
};

export default HomePage;
