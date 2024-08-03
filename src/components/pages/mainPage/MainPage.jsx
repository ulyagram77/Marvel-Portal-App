import { useState } from 'react';
import { Helmet } from 'react-helmet';

import { CharInfo, CharList, CharRandom, CharSearchForm } from 'src/components/interface';
import { ErrorBoundary } from 'src/components/others';

import { decoration } from 'src/assets';
import { useMatchMedia } from 'src/hooks';

const MainPage = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const { isTablet, isMobile } = useMatchMedia();

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

                {isTablet || isMobile ? null : (
                    <div className="char__block">
                        <ErrorBoundary>
                            <CharInfo characterId={selectedCharacter} />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharSearchForm />
                        </ErrorBoundary>
                    </div>
                )}
            </div>
            {isTablet || isMobile ? null : (
                <img className="bg-decoration" src={decoration} alt="vision" />
            )}
        </>
    );
};

export default MainPage;
