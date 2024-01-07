import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './CharList.scss';
import abyss from '../../assets/abyss.jpg';

class CharList extends Component {
    state = {
        characters: [],
        loading: true,
        error: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharacterListLoaded)
            .catch(this.onError);
    }

    onCharacterListLoaded = (characters) => {
        this.setState({ characters, loading: false });
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
        const { characters, loading, error } = this.state;

        const items = this.renderItems(characters);
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;
