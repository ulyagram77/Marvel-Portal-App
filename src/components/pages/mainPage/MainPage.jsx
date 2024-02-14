import { useState } from 'react';

import CharRandom from 'src/components/interface/charRandom/CharRandom';
import CharList from 'src/components/interface/charList/CharList';
import CharInfo from 'src/components/interface/charInfo/CharInfo';
import ErrorBoundary from 'src/components/others/errorBoundary/ErrorBoundary';

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
