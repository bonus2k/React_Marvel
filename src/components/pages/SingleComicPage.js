import './singleComicPage.scss';
import {useParams, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import Spiner from "../spiner/Spiner";
import Error from "../error/Error";

export const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {loading, error, getComic, clearError} = useMarvelService();
    useEffect(() => {
        loadComic(comicId); // eslint-disable-next-line
    }, [comicId])


    const loadComic = (comicId) => {
        clearError();
        getComic(comicId)
            .then(setComic);
    }

    const   spiner = (loading) ? <Spiner/> : null,
            errorMsg = (error && !loading) ? <Error/> : null,
            info = (comic && !error && !loading) ? <View/> : null;

    return (
        <div className="single-comic">
            {spiner}
            {errorMsg}
            {info}
        </div>
    )

    function View(){

        const {title, desc, thumbnail, price, page, lang} = comic;
        return (
            <>
                <img src={thumbnail} alt={title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{desc}</p>
                    <p className="single-comic__descr">{page}</p>
                    <p className="single-comic__descr">Language: {lang}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to={"/comics"} className="single-comic__back">Back to all</Link>
            </>
        )
    }
}

export default SingleComicPage;