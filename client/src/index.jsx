import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LibraryContextProvider } from './context/LibraryContext';
import { UserContextProvider } from './context/userContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <UserContextProvider>
      <LibraryContextProvider>
        <App />
      </LibraryContextProvider>
    </UserContextProvider>
  </>
)