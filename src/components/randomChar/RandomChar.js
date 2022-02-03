import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import Spiner from "../spiner/Spiner";
import Error from "../error/Error";


class RandomChar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            charRandom: {
                name: null,
                description: null,
                thumbnail: null,
                homepage: null,
                wiki: null
            },
            loading: true,
            error: false,
        }
    }

    componentDidMount() {
        this.getRandomChar();
    }

    onLoadingChar = () =>{
        this.setState({loading: true})
    }

    onLoadRandomChar = (charRandom) => {
        this.setState({charRandom, loading: false})
    }

    onError = () => {
        this.setState({error: true, loading: false})
    }

    getRandomChar = () => {
        this.onLoadingChar();
        const marvelServices = new MarvelService(),
            id = Math.floor(Math.random() * 400 + 1011000)
        marvelServices.getCharacter(id)
            .then(this.onLoadRandomChar)
            .catch(this.onError);
    }


    render() {
        const {charRandom, loading, error} = this.state,
            load = loading ? <Spiner/> : null,
            errorPic = error ? <Error/> : null,
            char = !(loading || error) ? <RenderChar char={charRandom}/> : null;
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
                    <button onClick={this.getRandomChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const RenderChar = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char,
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

export default RandomChar;