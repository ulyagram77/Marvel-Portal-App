import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useMarvelService } from 'src/services';
import { setContent } from 'src/utils';

import { mjolnir } from 'src/assets';
import './CharRandom.scss';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const CharRandom = () => {
    const [char, setChar] = useState({});

    const [parent] = useAutoAnimate();
    const { process, setProcess, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateCharacter();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateCharacter = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharacterLoaded)
            .then(() => setProcess('confirmed'));
    };

    const onCharacterLoaded = char => {
        setChar(char);
    };

    return (
        <div className="randomchar" ref={parent}>
            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!
                    <br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">Or choose another one</p>
                <button
                    className="button button__main"
                    disabled={process === 'loading'}
                    onClick={updateCharacter}
                >
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    );
};

//этот компонент был отделен от основного компонента для удобства работы с RandomChar компонентом
const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki } = data;
    let imgStyle = { objectFit: 'cover' };
    if (
        thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    ) {
        imgStyle = { objectFit: 'contain' };
    }

    return (
        <div className="randomchar__block">
            <img
                src={thumbnail}
                alt="Random character"
                className="randomchar__img"
                style={imgStyle}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

View.propTypes = {
    data: PropTypes.object,
};

export default CharRandom;
