import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/auth/AuthContext';
import { StoryProvider } from 'context/story/StoryContext';

ReactDOM.render(
  <React.StrictMode>
    <StoryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StoryProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
