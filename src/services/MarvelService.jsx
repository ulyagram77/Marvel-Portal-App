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

    getAllCharacters = async () => {
        return this.getResource(
            `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`,
        );
    };

    getCharacter = async (id) => {
        return this.getResource(
            `${this._apiBase}characters/${id}?${this._apiKey}`,
        );
    };
}

export default MarvelService;
