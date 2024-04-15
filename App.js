import 'react-native-gesture-handler';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { enableScreens } from 'react-native-screens';

import AppNavigator from './navigators/AppNavigator';
import rootReducer from './reducers/index';

enableScreens();

const store = createStore(rootReducer, composeWithDevTools)


export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

