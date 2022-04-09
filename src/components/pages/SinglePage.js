import './characterPage.scss';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import setContent from "../util/setContent";

const SinglePage = ({Container}) => {
    const {comicId, charId} = useParams();
    const [data, setData] = useState(null);
    const {process, setProcess, getComic, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        if (comicId){
            loadComic(comicId);
        }
        if (charId){
            loadChar(charId)
        } // eslint-disable-next-line
    }, [comicId, charId])


    const loadComic = (comicId) => {
        clearError();
        getComic(comicId)
            .then(setData)
            .then(() => setProcess('done'));
    }

    const loadChar = (charId) => {
        clearError();
        getCharacter(charId)
            .then(setData)
            .then(() => setProcess('done'));
    }

    return (
        <div className="single-comic">
            {setContent(process, Container, data)}
        </div>
    )


}

export default SinglePage;