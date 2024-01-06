class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = `apikey=${import.meta.env.VITE_REACT_APP_MARVEL_API_KEY}`;

    getResource = async (url) => {
        let result = await fetch(url);

        if (!result.ok) {
            throw new Error(
                `Could not fetch ${url}, received ${result.status}`,
            );
        }
        return await result.json();
    };

    getAllCharacters = () => {
        return this.getResource(
            `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`,
        );
    };

    getCharacter = async (id) => {
        const res = await this.getResource(
            `${this._apiBase}characters/${id}?${this._apiKey}`,
        );
        return this._transformCharacter(res.data.results[0]);
    };

    _transformCharacter = (character) => {
        return {
            name: character.name,
            description: character.description,
            thumbnail:
                character.thumbnail.path + `.${character.thumbnail.extension}`,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
        };
    };
}

export default MarvelService;
