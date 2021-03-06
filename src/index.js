import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/auth/AuthContext';
import { StoryProvider } from 'context/story/StoryContext';
import { HistoryProvider } from 'context/history/HistoryContext';
import { BookmarkProvider } from 'context/bookmark/BookMarkContext';

ReactDOM.render(
  <React.StrictMode>
    <HistoryProvider>
      <BookmarkProvider>
        <StoryProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </StoryProvider>
      </BookmarkProvider>
    </HistoryProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
