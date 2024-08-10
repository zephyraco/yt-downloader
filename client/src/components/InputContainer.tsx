import React from 'react';
import DownloadButton from '../components/DownloadButton';
import InputURL from '../components/InputURL';
import { IntlShape } from 'react-intl';
import { getVideoInfo } from '../utils/videoUtils';

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

  const handleGetInfo = () =>
    getVideoInfo(url, setShowInput, setVideoInfo, setLoading, setError);

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
