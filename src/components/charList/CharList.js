import './charList.scss';

import {useState, useEffect, useRef} from "react";
import MarvelService from "../../services/MarvelService";
import Spiner from "../spiner/Spiner";
import Error from "../error/Error";
import PropTypes from 'prop-types';

const CharList = (props) => {

    const [listChar, setListChar] = useState([]);
    const [loadList, setLoadList] = useState(true);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(210);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [charEnded, setCharEnded] = useState(false);
    const refItem = useRef([]);
    const marvelService = new MarvelService();

    const setChar = (element) => {
        element.addEventListener('focus', (event) => addSelected(event, element.id));
        element.addEventListener('blur', (event) => removeSelected(event));
    }

    useEffect(() => {
        refItem.current.forEach(setChar);
        clearEvent();
    })


    const addSelected = (event, id) => {
        findLiElement(event).add('char__item_selected');
        props.onSelectedChar(+id);
    }

    const removeSelected = (event) => {
        findLiElement(event).remove('char__item_selected');
    }

    const findLiElement = (event) => {
        let eventChar = event.target
        while (eventChar !== document) {
            if (eventChar && eventChar.tagName === "LI") {
                return eventChar.classList
            }
            eventChar = eventChar.parentNode;
        }
    }

    const clearEvent = () => {
        refItem.current.forEach(element => {
            element.removeEventListener('focus', (event) => addSelected(event, element.id));
            element.removeEventListener('blur', (event) => removeSelected(event));
        })
    }


    const onLoadCharList = (newListChar) => {
        setListChar(listChar => [...listChar, ...newListChar]);
        setLoadList(false);
        setNewItemLoading(false);
        setCharEnded(newListChar.length < 9);
        setOffset(offset => offset + 9);
    }

    const onNewItemLoading = () => {
        setNewItemLoading(true);
    }

    const onRequest = (offset) => {
        onNewItemLoading();
        marvelService
            .getAllCharacters(offset)
            .then(onLoadCharList)
            .catch(onError);
    }

    const onError = () => {
        setError(true);
        setLoadList(false);
    }

    useEffect(() => {
        onRequest(); // eslint-disable-next-line
    }, [])

    const getCharList = () => {
        return listChar.map((val, i) =>
            <li key={val.id}
                tabIndex={0}
                id={val.id}
                ref={el => refItem.current[i] = el}
                className="char__item">
                <img src={val.thumbnail} alt={val.name}
                     style={val.thumbnail.includes('image_not_available.jpg') ? {objectFit: 'fill'} : {}}/>
                <div className="char__name">{val.name}</div>
            </li>
        )
    }


    const errorMsg = error ? <Error/> : null,
        spiner = loadList ? <Spiner/> : null,
        charsList = !(loadList || error) ? getCharList() : null;

    return (
        <div className="char__list">
            <ul className="char__grid">
                {errorMsg}
                {spiner}
                {charsList}
            </ul>
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div
                    className="inner">load more
                </div>
            </button>
        </div>
    )

}

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired
}


export default CharList;