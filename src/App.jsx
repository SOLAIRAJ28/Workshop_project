import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import './index.css'; // Assuming you have some styles in App.css

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div style={{ padding: '20px' }}>
      {showLogin ? <Login /> : <Signup />}
      <button onClick={() => setShowLogin(!showLogin)} style={{ marginTop: '10px' }}>
        {showLogin ? 'Go to Signup' : 'Go to Login'}
      </button>
    </div>
  );
}

export default App;
