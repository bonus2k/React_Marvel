        import './charInfo.scss';
        import {useEffect, useState} from "react";
        import Skeleton from "../skeleton/Skeleton";
        import Spinner from "../spinner/Spinner";
        import Error from "../error/Error";
        import PropTypes from 'prop-types';
        import useMarvelService from "../../services/MarvelService";
        import {Link} from "react-router-dom";

        const CharInfo = (props) => {
            const [char, setChar] = useState(null);
            const {loading, error, getCharacter, clearError} = useMarvelService();

            useEffect(() => {
                getChar(props.selectedChar); // eslint-disable-next-line
            }, [])

            useEffect(() => {
                getChar(props.selectedChar); // eslint-disable-next-line
            }, [props.selectedChar])

            const getChar = (id) => {
                if (!props.selectedChar) {
                    return
                }
                clearError();
                getCharacter(id)
                    .then(setChar);
            }


            {
                const
                    skeleton = (!char && !error && !loading) ? <Skeleton/> : null,
                    spiner = (loading) ? <Spinner/> : null,
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