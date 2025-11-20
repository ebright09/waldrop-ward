import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Suppress specific console warnings for cleaner game logs
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (args[0]?.includes?.('Duplicate')) return;
  originalConsoleWarn(...args);
};

const root = ReactDOM.createRoot(rootElement);
root.render(
    <App />
);