import './charList.scss';

import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import Spiner from "../spiner/Spiner";


class CharList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listChar: [],
            loadList: false
        }
    }

    onLoadCharList = (listChar) => {
        this.setState({listChar, loadList: true})
    }

    componentDidMount() {
        const marvelService = new MarvelService();
        marvelService.getAllCharacters().then(this.onLoadCharList)
    }

    GetCharList() {
        return this.state.listChar.map(current =>
            <li key={current.id}
                onClick={() => this.props.onSelectedChar(current.id)}
                className="char__item">
                <img src={current.thumbnail} alt={current.name}
                     style={current.thumbnail.includes('image_not_available.jpg') ? {objectFit: 'fill'} : {}}/>
                <div className="char__name">{current.name}</div>
            </li>
        )
    }

    render() {
        const {loadList} = this.state,
        charList = loadList ? this.GetCharList() : <Spiner />;
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {charList}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }


}



export default CharList;