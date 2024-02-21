import { useState } from 'react';
import { Helmet } from 'react-helmet';

import CharRandom from 'src/components/interface/charRandom/CharRandom';
import CharList from 'src/components/interface/charList/CharList';
import CharInfo from 'src/components/interface/charInfo/CharInfo';
import CharSearchForm from 'src/components/interface/charSearchForm/CharSearchForm';
import ErrorBoundary from 'src/components/others/errorBoundary/ErrorBoundary';

import decoration from 'src/assets/vision.png';

const MainPage = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const onCharacterSelected = id => {
        setSelectedCharacter(id);
    };

    return (
        <>
            <Helmet>
                <meta name="description" content="Marvel Information Portal" />
                <title>Marvel Information Portal</title>
            </Helmet>

            <ErrorBoundary>
                <CharRandom />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharacterSelected={onCharacterSelected} />
                </ErrorBoundary>

                <div className="char__block">
                    <ErrorBoundary>
                        <CharInfo characterId={selectedCharacter} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm />
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    );
};

export default MainPage;
