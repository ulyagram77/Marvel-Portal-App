import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useMarvelService from 'src/services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './ComicsList.scss';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [paginationLoading, setPaginationLoading] = useState(false);
    const [offset, setOffset] = useState(400);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loading, error, getAllComics } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
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
    }, [offset, loading]);

    const onRequest = (offset, initial) => {
        initial ? setPaginationLoading(false) : setPaginationLoading(true);
        getAllComics(offset).then(onComicsListLoaded);
    };

    const onComicsListLoaded = newComics => {
        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }

        setComics(comics => [...comics, ...newComics]);
        setPaginationLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    };

    function renderItems(items) {
        const renderedItems = items.map((item, i) => {
            return (
                <CSSTransition key={i} timeout={500} classNames="comics__item">
                    <li className="comics__item">
                        <Link to={`/comics/${item.id}`}>
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="comics__item-img"
                            />
                            <div className="comics__item-name">{item.title}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </Link>
                    </li>
                </CSSTransition>
            );
        });

        return (
            <ul className="comics__grid">
                <TransitionGroup component={null}>{renderedItems}</TransitionGroup>
            </ul>
        );
    }

    const items = renderItems(comics);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !paginationLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                className="button button__main button__long"
                disabled={paginationLoading}
                style={{ display: comicsEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
