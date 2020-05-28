import React from 'react';
import { SemanticToastContainer } from 'react-semantic-toasts';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout />
      <SemanticToastContainer />
    </div>
  );
}

export default App;
