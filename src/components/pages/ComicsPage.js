import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import {Helmet, HelmetProvider} from "react-helmet-async";

const ComicsPage = () => {

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <meta
                        name="description"
                        content="Marvel comics list"/>
                    <title>Marvel comics list</title>
                </Helmet>
            </HelmetProvider>
            <AppBanner/>
            <ComicsList/>
        </>
    )
}

export default ComicsPage;