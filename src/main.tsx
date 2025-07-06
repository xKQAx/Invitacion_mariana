import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'; // si tienes un css global

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
