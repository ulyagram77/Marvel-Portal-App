import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = `apikey=${import.meta.env.VITE_REACT_APP_MARVEL_API_KEY}`;
    const _baseOffset = 340;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(
            `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`,
        );
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async id => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    };

    const getAllComics = async (offset = 0) => {
        const res = await request(
            `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`,
        );
        return res.data.results.map(_transformComics);
    };

    const getComic = async id => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    };

    const _transformCharacter = character => {
        return {
            id: character.id,
            name: character.name,
            description: character.description
                ? `${character.description.slice(0, 210)}...`
                : 'There is no description for this character =(',
            thumbnail: character.thumbnail.path + `.${character.thumbnail.extension}`,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items,
        };
    };

    const _transformComics = comics => {
        return {
            id: comics.id,
            title: comics.title,
            description:
                comics.description || 'There is no description for this comic =(',
            pageCount: comics.pageCount
                ? `${comics.pageCount} p.`
                : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + `.${comics.thumbnail.extension}`,
            language: comics.textObjects[0]?.language || 'en-us',
            // optional chaining operator
            price: comics.prices[0].price
                ? `${comics.prices[0].price}$`
                : 'not available',
        };
    };

    return {
        loading,
        error,
        getAllCharacters,
        getCharacter,
        getAllComics,
        getComic,
        clearError,
    };
};

export default useMarvelService;
