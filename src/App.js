import React from 'react';
import './App.css';
import Home from './components/Home';
import SWProvider from './context/SWProvider';

function App() {
  return (
    <div>
      <SWProvider>
        <span>Hello, App!</span>
        <Home />
      </SWProvider>
    </div>
  );
}

export default App;
