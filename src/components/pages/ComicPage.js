
import './comicPage.scss'
import {Link} from "react-router-dom";
import {Helmet, HelmetProvider} from "react-helmet-async"

const ComicPage = ({data}) => {
    const {name, desc, thumbnail, price, page, lang} = data;
        return (
            <>
                <HelmetProvider>
                    <Helmet>
                        <meta
                            name="description"
                            content={name}/>
                        <title>{name}</title>
                    </Helmet>
                </HelmetProvider>
                <img src={thumbnail} alt={name} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{desc}</p>
                    <p className="single-comic__descr">{page}</p>
                    <p className="single-comic__descr">{lang}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to={"/comics"} className="single-comic__back">Back to all</Link>
            </>
        )
}

export default ComicPage;