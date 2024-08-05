import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useLocalStorageService, useMarvelService } from 'src/services';
import { ErrorMessage, Spinner } from 'src/components/others';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import './ComicsList.scss';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [paginationLoading, setPaginationLoading] = useState(false);
    const [offset, setOffset] = useState(500);
    const [comicsEnded, setComicsEnded] = useState(false);

    const [parent] = useAutoAnimate();

    const { setItems, getItems } = useLocalStorageService();
    const { loading, error, getAllComics } = useMarvelService();

    useEffect(() => {
        const savedData = getItems('comics');
        if (savedData) {
            setComics(savedData.comics);
            setOffset(savedData.offset);
            setComicsEnded(savedData.comicsEnded);
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

    const onRequest = (offset, initial) => {
        initial ? setPaginationLoading(false) : setPaginationLoading(true);
        getAllComics(offset).then(onComicsListLoaded);
    };

    const onComicsListLoaded = newComics => {
        let ended = false;

        if (newComics.length < 8) {
            ended = true;
        }

        const updatedComics = [...comics, ...newComics];

        setComics(updatedComics);
        setPaginationLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);

        setItems('comics', {
            comics: updatedComics,
            offset: offset + 9,
            comicsEnded: ended,
        });
    };

    function renderItems(items) {
        const renderedItems = items.map(item => {
            return (
                <li className="comics__item" key={item.id}>
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
            );
        });

        return (
            <ul className="comics__grid" ref={parent}>
                {renderedItems}
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
                disabled={paginationLoading || loading}
                style={{ display: comicsEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
