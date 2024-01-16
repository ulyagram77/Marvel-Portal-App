import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './CharList.scss';

const CharList = (props) => {
    const [characters, setCharacters] = useState([]);
    const [paginationLoading, setPaginationLoading] = useState(false);
    const [offset, setOffset] = useState(400);
    const [charactersEnded, setCharactersEnded] = useState(false);
    const { loading, error, getAllCharacters } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight
            ) {
                onRequest(offset);
            }
        };

        window.addEventListener('scrollend', handleScroll);
        return () => {
            window.removeEventListener('scrollend', handleScroll);
        };
    }, [offset]);

    const itemRefs = useRef([]);

    const handleKeyDownCapture = (e, itemId, index) => {
        if (e.key === ' ' || e.key === 'Enter') {
            props.onCharacterSelected(itemId);
            onFocusItem(index);
        }
    };

    const onFocusItem = (id) => {
        itemRefs.current.forEach((item) =>
            item.classList.remove('char__item_selected'),
        );
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    };

    const onRequest = (offset, initial) => {
        initial ? setPaginationLoading(false) : setPaginationLoading(true);
        getAllCharacters(offset).then(onCharacterListLoaded);
    };

    const onCharacterListLoaded = (newCharacters) => {
        let ended = false;

        if (newCharacters.length < 9) {
            ended = true;
        }

        setCharacters((characters) => [...characters, ...newCharacters]);
        setPaginationLoading(false);
        setOffset((offset) => offset + 9);
        setCharactersEnded(ended);
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
                <li
                    className="char__item"
                    tabIndex={0}
                    ref={(el) => (itemRefs.current[i] = el)}
                    key={item.id}
                    onClick={() => {
                        props.onCharacterSelected(item.id);
                        onFocusItem(i);
                    }}
                    onKeyDownCapture={(e) =>
                        handleKeyDownCapture(e, item.id, i)
                    }
                >
                    <img
                        src={item.thumbnail}
                        alt={item.name}
                        style={imgStyle}
                    />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });
        // конструкция вынесена для центровки спиннера/ошибки
        return <ul className="char__grid">{renderedItems}</ul>;
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
                disabled={paginationLoading}
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
