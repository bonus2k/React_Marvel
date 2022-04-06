import './characterPage.scss';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

const SinglePage = ({Container}) => {
    const {comicId, charId} = useParams();
    const [objectMarvel, setObjectMarvel] = useState(null);
    const {loading, error, getComic, getCharacter, clearError} = useMarvelService();


    useEffect(() => {
        if (comicId){
            loadComic(comicId); // eslint-disable-next-line
        }
        if (charId){
            loadChar(charId)
        }
    }, [comicId, charId])


    const loadComic = (comicId) => {
        clearError();
        getComic(comicId)
            .then(setObjectMarvel);
    }

    const loadChar = (charId) => {
        clearError();
        getCharacter(charId)
            .then(setObjectMarvel);
    }

    const   spinner = (loading) ? <Spinner/> : null,
            errorMsg = (error && !loading) ? <Error/> : null,
            info = (objectMarvel && !error && !loading) ? <Container data = {objectMarvel}/> : null;

    return (
        <div className="single-comic">
            {spinner}
            {errorMsg}
            {info}
        </div>
    )


}

export default SinglePage;