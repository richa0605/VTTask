/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import Main from './src/Main';
import { name as appName } from './app.json';

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;

AppRegistry.registerComponent(appName, () => App);
