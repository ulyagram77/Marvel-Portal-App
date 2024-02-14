import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import useMarvelService from 'src/services/MarvelService';
import Spinner from 'src/components/others/spinner/Spinner';
import ErrorMessage from 'src/components/others/errorMessage/ErrorMessage';
import Skeleton from 'src/components/others/skeleton/Skeleton';

import './CharInfo.scss';

const CharInfo = props => {
    const [char, setChar] = useState(null);

    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateCharacterInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.characterId]);

    const updateCharacterInfo = () => {
        const { characterId } = props;
        if (!characterId) {
            return;
        }

        clearError();
        getCharacter(characterId).then(onCharacterLoaded);
    };

    const onCharacterLoaded = char => {
        setChar(char);
    };

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
};

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    let imgStyle = { objectFit: 'cover' };
    if (
        thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    ) {
        imgStyle = { objectFit: 'contain' };
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There are no comics with this character =('}
                {comics.map((item, i) => {
                    //извлекаем id всех комиксов вначале разделим строку, потом извлечем последний елемент
                    const comicsId = item.resourceURI.split('/').pop();

                    if (i > 9) return;
                    return (
                        <li key={i} className="char__comics-item">
                            <Link
                                className="char__comics-link"
                                to={`/comics/${comicsId}`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

View.propTypes = {
    char: PropTypes.object,
};

CharInfo.propTypes = {
    characterId: PropTypes.number,
};

export default CharInfo;
