import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './componets/App';
import firebase from './fbinstanc';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
