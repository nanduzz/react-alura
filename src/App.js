import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';

class App extends Component {
  render() {
    return (
      <div id="root">
        <div className="main">
          <Header />
          <Timeline login={this.props.params.login} />
        </div>
      </div>
    );
  }
}

App.contextType = {
  store: React.PropTypes.object.isRequired
}
export default App;