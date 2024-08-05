import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorageService, useMarvelService } from 'src/services';
import { ErrorMessage, Spinner } from 'src/components/others';
import { useMatchMedia } from 'src/hooks';
import { Link } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import './CharList.scss';

const CharList = props => {
    const [characters, setCharacters] = useState([]);
    const [paginationLoading, setPaginationLoading] = useState(false);
    const [offset, setOffset] = useState(400);
    const [charactersEnded, setCharactersEnded] = useState(false);

    const [parent] = useAutoAnimate();

    const { setItems, getItems } = useLocalStorageService();
    const { isMobile, isTablet } = useMatchMedia();
    const { loading, error, getAllCharacters } = useMarvelService();

    useEffect(() => {
        const savedData = getItems('characters');
        if (savedData) {
            setCharacters(savedData.characters);
            setOffset(savedData.offset);
            setCharactersEnded(savedData.charactersEnded);
        } else {
            onRequest(offset, true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (
                !loading &&
                window.innerHeight + window.scrollY >= document.body.offsetHeight
            ) {
                onRequest(offset);
            }
        };

        window.addEventListener('scrollend', handleScroll);
        return () => {
            window.removeEventListener('scrollend', handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset, loading]);

    const itemRefs = useRef([]);

    const handleKeyDownCapture = (e, itemId, index) => {
        if (e.key === ' ' || e.key === 'Enter') {
            props.onCharacterSelected(itemId);
            onFocusItem(index);
        }
    };

    const onFocusItem = id => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    };

    const onRequest = (offset, initial) => {
        initial ? setPaginationLoading(false) : setPaginationLoading(true);
        getAllCharacters(offset).then(onCharacterListLoaded);
    };

    const onCharacterListLoaded = newCharacters => {
        let ended = false;

        if (newCharacters.length < 9) {
            ended = true;
        }

        const updatedCharacters = [...characters, ...newCharacters];

        setCharacters(updatedCharacters);
        setPaginationLoading(false);
        setOffset(offset => offset + 9);
        setCharactersEnded(ended);

        setItems('characters', {
            characters: updatedCharacters,
            offset: offset + 9,
            charactersEnded: ended,
        });
    };

    function renderItems(items) {
        const renderedItems = items.map((item, i) => {
            let imgStyle = { objectFit: 'cover' };
            if (
                item.thumbnail ===
                'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            ) {
                imgStyle = { objectFit: 'unset' };
            }

            return (
                <div key={item.id}>
                    {isMobile || isTablet ? (
                        <Link to={`/characters/${item.id}`} className="char__item">
                            <li className="char__item" tabIndex={0}>
                                <img
                                    src={item.thumbnail}
                                    alt={item.name}
                                    style={imgStyle}
                                />
                                <div className="char__name">{item.name}</div>
                            </li>
                        </Link>
                    ) : (
                        <li
                            className="char__item"
                            tabIndex={0}
                            ref={el => (itemRefs.current[i] = el)}
                            onClick={() => {
                                props.onCharacterSelected(item.id);
                                onFocusItem(i);
                            }}
                            onKeyDownCapture={e => handleKeyDownCapture(e, item.id, i)}
                        >
                            <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                            <div className="char__name">{item.name}</div>
                        </li>
                    )}
                </div>
            );
        });

        return (
            <ul className="char__grid" ref={parent}>
                {renderedItems}
            </ul>
        );
    }

    const items = renderItems(characters);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !paginationLoading ? <Spinner /> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                className="button button__main button__long"
                disabled={paginationLoading || loading}
                style={{ display: charactersEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

CharList.propTypes = {
    onCharacterSelected: PropTypes.func.isRequired,
};

export default CharList;
