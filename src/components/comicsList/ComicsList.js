import './comicsList.scss';
import useMarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import {Link} from "react-router-dom";

const ComicsList = () => {
    const {loading, error, getAllComics} = useMarvelService();
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(8);
    const [newItemLoad, setNewItemLoad] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);


    const onLoadComicsList = (newComics) => {
        setComics(comics => [...comics, ...newComics]);
        setNewItemLoad(false);
        setComicsEnded(newComics.length < 8);
        setOffset(offset => offset + 8);
    }

    const onRequest = (initial) => {
        setNewItemLoad(!initial);
        getAllComics(offset)
            .then(onLoadComicsList);
    }

    useEffect(() => {
        getAllComics(offset)
            .then(onLoadComicsList); // eslint-disable-next-line
    }, [])

    const getComicsList = () => {
        return (
                comics.map((comics, i) =>
                    <li className="comics__item"
                        key = {i}
                        id = {comics.id}
                        tabIndex={0}>
                        <Link to={`/comics/${comics.id}`} >
                            <img src={comics.thumbnail} alt={comics.title} className="comics__item-img"/>
                            <div className="comics__item-name">{comics.title}</div>
                            <div className="comics__item-price">{comics.price}$</div>
                        </Link>
                    </li>
                            )
                )
    }

    const   errorMsg = error ? <Error/> : null,
            spiner = loading && !newItemLoad ? <Spinner/> : null;
    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {errorMsg}
                {spiner}
                {getComicsList()}
            </ul>
            <button
                disabled={newItemLoad}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                onClick={() => onRequest()}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;