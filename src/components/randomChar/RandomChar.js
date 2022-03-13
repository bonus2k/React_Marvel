import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {useEffect, useState} from "react";
import Spiner from "../spiner/Spiner";
import Error from "../error/Error";
import useMarvelService from "../../services/MarvelService";


const RandomChar = () => {
    const [charRandom, setCharRandom] = useState();
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        getRandomChar(); // eslint-disable-next-line
    }, [])

    const getRandomChar = () => {
        clearError();
        const id = Math.floor(Math.random() * 400 + 1011000)
        getCharacter(id)
            .then(setCharRandom);
    }

    const RenderChar = () => {
        const {name, description, thumbnail, homepage, wiki} = charRandom,
            style = thumbnail.includes('image_not_available.jpg') ? {objectFit: 'fill'} : {}
        return (
            <div className="randomchar__block">
                <img src={thumbnail} alt="Random character" className="randomchar__img" style={style}/>

                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {description}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    const load = loading ? <Spiner/> : null,
        errorPic = error ? <Error/> : null,
        char = !(loading || error || !charRandom) ? <RenderChar/> : null;

    return (
        <div className="randomchar">
            {errorPic}
            {load}
            {char}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={getRandomChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )

}
export default RandomChar;