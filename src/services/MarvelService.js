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

    getAllCharacters = async (offset = 210) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        const str = char.description;
        return {
            id: char.id,
            name: char.name,
            description: (str.length > 237) ? this.cutStringLastSpaceLength(str, 220) : str,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        };
    }

    cutStringLastSpaceLength(str, length) {
        str = str.substring(0, length);
        if (+str.lastIndexOf(" ") + 5 > length) {
            return str.substring(0, +str.lastIndexOf(" ")).trim() + '...';
        }
        return str.trim() + "...";
    }
}

export default MarvelService;