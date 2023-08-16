import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { StoryProvider } from 'context/story/StoryContext';
import { AuthProvider } from 'context/auth/AuthContext';
import { BookmarkProvider } from 'context/bookmark/BookMarkContext';
import { HistoryProvider } from 'context/history/HistoryContext';

ReactDOM.render(
  <HistoryProvider>
    <BookmarkProvider>
      <StoryProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </StoryProvider>
    </BookmarkProvider>
  </HistoryProvider>,
  document.getElementById('root')
);

reportWebVitals();
