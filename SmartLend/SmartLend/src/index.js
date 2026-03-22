import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './routes/store';
import { AuthContextProvider } from './context/AuthContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './tailwind.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./tailwind-output.css";


// Create React root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render App with Redux and Auth Provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// ✅ Register service worker for PWA capabilities
serviceWorkerRegistration.register();
