import './charInfo.scss';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";
import Spiner from "../spiner/Spiner";
import Error from "../error/Error";

class CharInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            char: null,
            loading: false,
            error: false,
        }
    }

    componentDidMount() {
        this.getChar(this.props.selectedChar);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedChar !== this.props.selectedChar) {
            this.getChar(this.props.selectedChar)
        }
    }

    onLoadingChar = () => {
        this.setState({loading: true})
    }

    onLoadChar = (char) => {
        this.setState({char, loading: false})
    }

    onError = () => {
        this.setState({error: true, loading: false})
    }

    getChar = (id) => {
        if (!this.props.selectedChar) {
            return
        }
        this.onLoadingChar();
        const marvelServices = new MarvelService();
        marvelServices.getCharacter(id)
            .then(this.onLoadChar)
            .catch(this.onError);
    }


    render() {
        const {char, error, loading} = this.state,
            skeleton = (!char && !error && !loading) ? <Skeleton/> : null,
            spiner = (loading) ? <Spiner/> : null,
            errorMsg = (error && !loading) ? <Error/> : null,
            info = (char && !error && !loading) ? <View char={char}/> : null;
        return (
            <div className="char__info">
                {skeleton}
                {spiner}
                {errorMsg}
                {info}
            </div>
        )
    }
}

function View({char}) {
    const {description, name, thumbnail, wiki, homepage, comics} = char,
        style = thumbnail.includes('image_not_available.jpg') ? {objectFit: 'fill'} : {};

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={style}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
                `
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : `Comics with ${name} not found`}
                {
                    comics.map((item, i) => {
                        if (i > 9) {
                            return;
                        }
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )

                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;