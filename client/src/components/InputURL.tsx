import React, { Dispatch, SetStateAction, useState } from 'react';
import { IntlShape } from 'react-intl';
import styled from 'styled-components';

const TextInput = styled.input`
  ${({ theme }) => theme.textInput};
  &:focus {
    outline: none;
  }
`;

interface InputURLProps {
  intl: IntlShape;
  setURL: Dispatch<SetStateAction<string>>;
  url: string;
}

const InputURL: React.FC<InputURLProps> = (props: InputURLProps) => {
  const { intl, url, setURL } = props;
  const { formatMessage } = intl;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setURL(event.target.value);
  };

  return (
    <form>
      <TextInput
        type="text"
        id="video-url"
        value={url}
        onChange={handleChange}
        placeholder={formatMessage({ id: 'download_button_placeholder' })}
      />
    </form>
  );
};

export default InputURL;
