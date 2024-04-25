import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import useMarvelService from 'src/services/MarvelService';
import setContent from 'src/utils/setContent';

import arrow from 'src/assets/arrow.svg';
import './CharInfo.scss';

const CharInfo = props => {
    const [char, setChar] = useState(null);
    const { process, setProcess, getCharacter, clearError } = useMarvelService();

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
        getCharacter(characterId)
            .then(onCharacterLoaded)
            .then(() => setProcess('confirmed'));
    };

    const onCharacterLoaded = char => {
        setChar(char);
    };

    return <div className="char__info">{setContent(process, View, char)}</div>;
};

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = data;

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
            <ExpandableList data={comics} />
        </>
    );
};

const ExpandableList = ({ data }) => {
    const [isExpanded, setExpanded] = useState(true);
    const [parent] = useAutoAnimate();

    const toggleExpanded = () => {
        setExpanded(!isExpanded);
    };

    const classNames = `char__comics-arrow ${isExpanded ? '' : 'char__comics-arrow_active'}`;

    return (
        <>
            <div className="char__comics" onClick={toggleExpanded}>
                <div className="char__comics-title">Comics:</div>
                <img className={classNames} src={arrow} alt="arrow" />
            </div>

            <div ref={parent}>
                {isExpanded ? (
                    <ul className="char__comics-list">
                        {data.length > 0
                            ? null
                            : 'There are no comics with this character =('}
                        {data.map((item, i) => {
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
                ) : (
                    <div className="char__comics-nolist">
                        Click on arrow to expand list of comics...
                    </div>
                )}
            </div>
        </>
    );
};

View.propTypes = {
    data: PropTypes.object,
};

ExpandableList.propTypes = {
    data: PropTypes.array,
};

CharInfo.propTypes = {
    characterId: PropTypes.number,
};

export default CharInfo;
