import { useState } from 'react';
import AppHeader from '../appHeader/AppHeader';
import CharRandom from '../charRandom/CharRandom';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../assets/vision.png';

const App = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const onCharacterSelected = (id) => {
        setSelectedCharacter(id);
    };

    return (
        <div className="app">
            <AppHeader />
            <main>
                <ErrorBoundary>
                    <CharRandom />
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharacterSelected={onCharacterSelected} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo characterId={selectedCharacter} />
                    </ErrorBoundary>
                </div>
                <img
                    className="bg-decoration"
                    src={decoration}
                    alt="vision"
                />
            </main>
        </div>
    );
};

export default App;
