import React from "react";
import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Spinner from "../spinner/Spinner";

const Page404 = React.lazy(() => import('../pages/Page404'));
const MainPage = React.lazy(() => import('../pages/MainPage'));
const ComicsPage = React.lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = React.lazy(() => import('../pages/SingleComicPage'));


const App = () => {

    return (
        <Router>
            <React.Suspense fallback={<Spinner/>}>
                <div className="app">
                    <AppHeader/>
                    <main>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </main>
                </div>
            </React.Suspense>
        </Router>
    )
}

export default App;