import React from 'react';
import { CircleLoader, RingLoader } from 'react-spinners';
import { theme } from '../theme/theme';
import { CSSProperties } from 'styled-components';

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      {/* <RingLoader size={150} color={'#123abc'} loading={true} /> */}
      <CircleLoader loading={true} color={theme.colors.bismark}></CircleLoader>
    </div>
  );
};

export default Loading;
