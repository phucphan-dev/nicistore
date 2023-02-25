import './App.scss';
import React from 'react';

import Example from 'components/templates/Example';
import Home from 'pages/Home';

const App: React.FC = () => (
  <div>
    <Example />
    <Home />
  </div>
);

export default App;
