import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';
import {useState} from "react";
import ComicsList from "../comicsList/ComicsList";

const App = () => {
    const [char, setChar] = useState(null);

    const onSelectedChar = (id) => {
        setChar(id);
    }

    return (
        <div className="app">
            <ErrorBoundary>
                <AppHeader/>
            </ErrorBoundary>
            <main>
                {/*<ErrorBoundary>*/}
                {/*    <RandomChar/>*/}
                {/*</ErrorBoundary>*/}
                {/*<div className="char__content">*/}
                {/*    <ErrorBoundary>*/}
                {/*        <CharList onSelectedChar={onSelectedChar}/>*/}
                {/*    </ErrorBoundary>*/}
                {/*    <ErrorBoundary>*/}
                {/*        <CharInfo selectedChar={char}/>*/}
                {/*    </ErrorBoundary>*/}
                {/*</div>*/}
                {/*<img className="bg-decoration" src={decoration} alt="vision"/>*/}
                <ComicsList/>
            </main>
        </div>
    )
}

export default App;