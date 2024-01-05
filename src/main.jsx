import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App.jsx';
import MarvelService from './services/MarvelService.jsx';

import './styles/main.scss';

const marvelService = new MarvelService();
marvelService
    .getAllCharacters()
    .then((res) => res.data.results.forEach((item) => console.log(item.name)));
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
