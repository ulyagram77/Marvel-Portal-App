class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = `apikey=${import.meta.env.VITE_REACT_APP_MARVEL_API_KEY}`;
    _baseOffset = 210;

    getResource = async (url) => {
        let result = await fetch(url);

        if (!result.ok) {
            throw new Error(
                `Could not fetch ${url}, received ${result.status}`,
            );
        }
        return await result.json();
    };

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(
            `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`,
        );
        return res.data.results.map(this._transformCharacter);
    };

    getCharacter = async (id) => {
        const res = await this.getResource(
            `${this._apiBase}characters/${id}?${this._apiKey}`,
        );
        return this._transformCharacter(res.data.results[0]);
    };

    _transformCharacter = (character) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description
                ? `${character.description.slice(0, 210)}...`
                : 'There is no description for this character =(',
            thumbnail:
                character.thumbnail.path + `.${character.thumbnail.extension}`,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items,
        };
    };
}

export default MarvelService;
