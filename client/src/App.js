import { useIntl } from 'react-intl';

function App() {
  const intl = useIntl();
  const { formatMessage } = intl;
  return (
    <div className="App">
      <header className="App-header">
        {formatMessage({ id: 'welcome', defaultMessage: 'Default Header' })}
      </header>
    </div>
  );
}
export default App;
