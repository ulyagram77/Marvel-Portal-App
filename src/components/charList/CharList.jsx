import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './CharList.scss';

class CharList extends Component {
    state = {
        characters: [],
        loading: true,
        paginationLoading: false,
        error: false,
        offset: 270,
        charactersEnded: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharacterListLoaded)
            .catch(this.onError);
    };

    onCharListLoading = () => {
        this.setState({ paginationLoading: true });
    };

    onCharacterListLoaded = (newCharacters) => {
        let ended = false;

        if (newCharacters.length < 9) {
            ended = true;
        }

        this.setState(({ characters, offset }) => ({
            characters: [...characters, ...newCharacters],
            loading: false,
            paginationLoading: false,
            offset: offset + 9,
            charactersEnded: ended,
        }));
    };

    onError = () => {
        this.setState({ loading: false, error: true });
    };

    renderItems(items) {
        const renderedItems = items.map((item) => {
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
                    key={item.id}
                    onClick={() => this.props.onCharacterSelected(item.id)}
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

    render() {
        const {
            characters,
            loading,
            error,
            paginationLoading,
            offset,
            charactersEnded,
        } = this.state;

        const items = this.renderItems(characters);
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button
                    className="button button__main button__long"
                    disabled={paginationLoading}
                    style={{ display: charactersEnded ? 'none' : 'block' }}
                    onClick={() => this.onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

CharList.propTypes = {
    onCharacterSelected: PropTypes.func.isRequired,
};

export default CharList;
