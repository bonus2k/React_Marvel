import {useHttp} from "../components/hooks/http.hook";

const useMarvelService = () => {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=03721cbd56d442b3de40d2f56ceabbc4'
    const {error, loading, request, clearError, process, setProcess} = useHttp();

    const getAllCharacters = async (offset = 210) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterName = async (name) => {
        const res = await request(`${_apiBase}characters?nameStartsWith=${name}&orderBy=name&limit=1&${_apiKey}`);
        return {
            id: (res.data.results[0]) ? res.data.results[0].id : 1,
            name: (res.data.results[0]) ? res.data.results[0].name : null
        };

    }

    const getAllComics = async (offset = 210) => {
        const res = await request(`${_apiBase}comics?issueNumber=0&limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics(res.data.results[0]);
    }

    const _transformComics = (comics) => {
        return {
            id : comics.id,
            name: comics.title,
            desc: comics.description,
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            price: comics.prices.price ? `${comics.prices.price}$` : `not available`,
            pages: comics.pageCount ? `${comics.pageCount} p.` : `Not information about of number of page`,
            lang: comics.textObjects.language ? `Language: ${comics.textObjects.language}` : `Language: en-us`
        }
    }

    const _transformCharacter = (char) => {
        const str = char.description;
        return {
            id: char.id,
            name: char.name,
            description: (str.length > 237) ? _cutStringLastSpaceLength(str, 220) : str,
            desc: str,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items.map(_addComicId)
        };
    }

    function _cutStringLastSpaceLength(str, length) {
        str = str.substring(0, length);
        if (+str.lastIndexOf(" ") + 5 > length) {
            return str.substring(0, +str.lastIndexOf(" ")).trim() + '...';
        }
        return str.trim() + "...";
    }

    function _addComicId(comic){
        const regExp = /(?!comics)\d*$/g;
        const listId = regExp.exec(comic.resourceURI);
        return {
            name: comic.name,
            resourceURI: comic.resourceURI,
            comicId: listId[0]
        }
    }

    return {getCharacter, getCharacterName, getAllCharacters, getAllComics, getComic, loading, error, clearError, process, setProcess};
}

export default useMarvelService;