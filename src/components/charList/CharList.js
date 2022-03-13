import './charList.scss';

import {useState, useEffect, useRef} from "react";
import Spiner from "../spiner/Spiner";
import Error from "../error/Error";
import PropTypes from 'prop-types';
import useMarvelService from "../../services/MarvelService";

const CharList = (props) => {

    const [listChar, setListChar] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [charEnded, setCharEnded] = useState(false);
    const refItem = useRef([]);
    const {loading, error, getAllCharacters} = useMarvelService();

    const setChar = (element) => {
        element.addEventListener('focus', (event) => addSelected(event, element.id));
        element.addEventListener('blur', (event) => removeSelected(event));
    }

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

    useEffect(() => {
        onRequest(offset, true); // eslint-disable-next-line
    }, [])

    useEffect(() => {
        refItem.current.forEach(setChar);
        return clearEvent();
    })

    const onLoadCharList = (newListChar) => {
        setListChar(listChar => [...listChar, ...newListChar]);
        setNewItemLoading(false);
        setCharEnded(newListChar.length < 9);
        setOffset(offset => offset + 9);
    }

    const onRequest = (offset, initial) => {
        setNewItemLoading(!initial);
        getAllCharacters(offset)
            .then(onLoadCharList)
    }

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


    const   errorMsg = error ? <Error/> : null,
            spiner = loading && !newItemLoading ? <Spiner/> : null;


    return (
        <div className="char__list">
            <ul className="char__grid">
                {errorMsg}
                {spiner}
                {getCharList()}
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