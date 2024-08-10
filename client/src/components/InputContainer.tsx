import React from 'react';
import DownloadButton from '../components/DownloadButton';
import InputURL from '../components/InputURL';
import { IntlShape } from 'react-intl';

interface InputContainerProps {
  intl: IntlShape;
  setShowInput: (flag: boolean) => void;
  setVideoInfo: (data: any) => void;
  setLoading: (flag: boolean) => void;
  setError: (flag: boolean) => void;
}

const InputContainer = (props: InputContainerProps) => {
  const { intl, setShowInput, setVideoInfo, setLoading, setError } = props;
  const { formatMessage } = props.intl;
  const [url, setUrl] = React.useState('');

  const handleGetInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5050/get-info?url=${encodeURIComponent(url)}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log('data', data);
        setShowInput(false);
        setVideoInfo(data);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
        throw new Error('Failed to download video. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError(true);
      setLoading(false);
      throw new Error('An error occurred while processing your request.');
    }
  };

  return (
    <>
      <InputURL intl={intl} url={url} setURL={setUrl} />
      <DownloadButton
        onClick={handleGetInfo}
        text={formatMessage({ id: 'next' })}
      />
    </>
  );
};

export default InputContainer;
