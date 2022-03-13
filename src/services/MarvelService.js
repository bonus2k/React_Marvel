import {useHttp} from "../components/hooks/http.hook";

const useMarvelService = () => {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=03721cbd56d442b3de40d2f56ceabbc4'
    const {error, loading, request, clearError} = useHttp();

    const getAllCharacters = async (offset = 210) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = 210) => {
        const res = await request(`${_apiBase}comics?issueNumber=0&limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics);
    }

    const _transformComics = (comics) => {
        return {
            id : comics.id,
            title: comics.title,
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            price: comics.prices[0].price
        }
    }

    const _transformCharacter = (char) => {
        const str = char.description;
        return {
            id: char.id,
            name: char.name,
            description: (str.length > 237) ? cutStringLastSpaceLength(str, 220) : str,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        };
    }

    function cutStringLastSpaceLength(str, length) {
        str = str.substring(0, length);
        if (+str.lastIndexOf(" ") + 5 > length) {
            return str.substring(0, +str.lastIndexOf(" ")).trim() + '...';
        }
        return str.trim() + "...";
    }

    return {getCharacter, getAllCharacters, getAllComics, loading, error, clearError};
}

export default useMarvelService;