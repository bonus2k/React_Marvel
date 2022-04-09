    import './charInfo.scss';
    import {useEffect, useState} from "react";
    import PropTypes from 'prop-types';
    import useMarvelService from "../../services/MarvelService";
    import {Link} from "react-router-dom";
    import setContent from "../util/setContent";

    const CharInfo = (props) => {
        const [char, setChar] = useState(null);
        const {process, setProcess, getCharacter, clearError} = useMarvelService();

        useEffect(() => {
            getChar(props.selectedChar); // eslint-disable-next-line
        }, [props.selectedChar])

        const getChar = (id) => {
            if (!props.selectedChar) {
                return
            }
            clearError();
            getCharacter(id)
                .then(setChar)
                .then(() => setProcess('done'));
        }

        return (
            <div className="char__info">
                {setContent(process, View, char)}
            </div>
        )

    }

    const View = ({data}) => {
        const {description, name, thumbnail, wiki, homepage, comics} = data;

        return (
            <>
                <div className="char__basics">
                    <img src={thumbnail} alt={name}
                         style={thumbnail.includes('image_not_available.jpg') ? {objectFit: 'fill'} : {}}/>
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
                            if (i > 9) { // eslint-disable-next-line
                                return;
                            }
                            return (
                                <li key={i} className="char__comics-item">
                                    <Link to={`/comics/${item.comicId}`}>{item.name}</Link>
                                </li>
                            )

                        })
                    }
                </ul>
            </>
        )
    }

    CharInfo.propTypes = {
        selectedChar: PropTypes.number
    }
    export default CharInfo;