import React from 'react';
import './App.scss';
import { HashRouter as Router } from 'react-router-dom'
import routes from './routes'
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        {routes}
      </Router>
    </Provider>
  );
}

export default App;
