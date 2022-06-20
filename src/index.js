import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/auth/AuthContext';
import { StoryProvider } from 'context/story/StoryContext';
import { BookmarkProvider } from 'context/bookmark/BookMarkContext';

ReactDOM.render(
  <React.StrictMode>
    <BookmarkProvider>
      <StoryProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </StoryProvider>
    </BookmarkProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
