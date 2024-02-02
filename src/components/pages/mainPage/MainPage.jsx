import { useState } from 'react';

import CharRandom from 'src/components/charRandom/CharRandom';
import CharList from 'src/components/charList/CharList';
import CharInfo from 'src/components/charInfo/CharInfo';
import ErrorBoundary from 'src/components/errorBoundary/ErrorBoundary';

import decoration from 'src/assets/vision.png';

const MainPage = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const onCharacterSelected = id => {
        setSelectedCharacter(id);
    };

    return (
        <>
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
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    );
};

export default MainPage;
