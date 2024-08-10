import React, { useEffect, useState } from 'react';
import HeadSection from '../components/HeadSection';
import VideoInfo from '../components/VideoInfo';
import InputContainer from '../components/InputContainer';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { Card, Container } from '../components/StyledDivs';
import { mockVideoInfo } from '../constants/constants';
import { IntlShape } from 'react-intl';

interface HomepageProps {
  intl: IntlShape;
}

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
    <>
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
    </>
  );
};

export default HomePage;
