import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import App from './App';
import { loadLocale } from './utils/locale';
import './index.css';
import Loading from './components/Loading';

const Root = () => {
  const [locale] = useState(navigator.language);
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const languageCode = locale.split('-')[0];
    loadLocale(languageCode).then(loadedMessages => {
      setMessages(loadedMessages);
      setLoading(false);
    });
  }, [locale]);

  if (loading) {
    return <Loading />;
  }

  return (
    <IntlProvider locale={locale} messages={messages}>
      <App />
    </IntlProvider>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Root />);
