import './charList.scss';

import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import Spiner from "../spiner/Spiner";
import Error from "../error/Error";
import PropTypes, {element} from 'prop-types';

class CharList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listChar: [],
            loadList: true,
            error: false,
            offset: 210,
            newItemLoading: false,
            charEnded: false
        }

        this.setCharList = [];

        this.setChar = (element) => {
            this.setCharList.push(element);
            element.addEventListener('focus', (event) => this.addSelected(event, element.id));
            element.addEventListener('blur', (event) => this.removeSelected(event));
        }
    }

    addSelected = (event, id) => {
        this.findLiElement(event).add('char__item_selected');
        this.props.onSelectedChar(+id);
    }

    removeSelected = (event) => {
        this.findLiElement(event).remove('char__item_selected');
    }

    findLiElement = (event) => {
        let eventChar = event.target
        while (eventChar != document) {
            if (eventChar && eventChar.tagName == "LI") {
                return eventChar.classList
            }
            eventChar = eventChar.parentNode;
        }
    }

    componentWillUnmount() {
        this.setCharList.forEach(element => {
            element.removeEventListener('focus', (event) => this.addSelected(event, element.id));
            element.removeEventListener('blur', (event) => this.removeSelected(event));
        })
    }

    marvelService = new MarvelService();

    onLoadCharList = (newListChar) => {
        this.setState(({offset, listChar}) => ({
            listChar: [...listChar, ...newListChar],
            loadList: false,
            newItemLoading: false,
            charEnded: newListChar.length < 9,
            offset: offset + 9
        }))
    }

    onNewItemLoading = () => {
        this.setState({newItemLoading: true})
    }

    onRequest = (offset) => {
        this.onNewItemLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onLoadCharList)
            .catch(this.onError)
    }

    onError = () => {
        this.setState({
            error: true,
            loadList: false
        })
    }

    componentDidMount() {
        this.onRequest()
    }

    GetCharList() {
        return this.state.listChar.map(current =>
            <li key={current.id}
                tabIndex={0}
                id={current.id}
                ref={this.setChar}
                className="char__item">
                <img src={current.thumbnail} alt={current.name}
                     style={current.thumbnail.includes('image_not_available.jpg') ? {objectFit: 'fill'} : {}}/>
                <div className="char__name">{current.name}</div>
            </li>
        )
    }

    render() {
        const {loadList, error, offset, newItemLoading, charEnded} = this.state,
            errorMsg = error ? <Error/> : null,
            spiner = loadList ? <Spiner/> : null,
            charList = !(loadList || error) ? this.GetCharList() : null;
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {errorMsg}
                    {spiner}
                    {charList}
                </ul>
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div
                        className="inner">load more
                    </div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired
}


export default CharList;