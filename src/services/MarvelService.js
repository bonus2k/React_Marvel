class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=03721cbd56d442b3de40d2f56ceabbc4'

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw  new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    }
}

export default MarvelService;