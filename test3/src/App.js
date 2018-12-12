import React, { Component } from 'react'
import { Provider } from 'react-redux'

import SimpleTabs from './js/components/simpleTabs'
import store from './js/redux/star.store'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <SimpleTabs></SimpleTabs>
        </Provider>
      </div>
    );
  }
}

export default App;