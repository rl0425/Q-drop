import Main from "./component/Main";
import {useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AuthLoading from "./component/My/AuthLoading";
import { CookiesProvider } from 'react-cookie';


function App() {

    function setScreenSize() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    useEffect(() => {
        setScreenSize();
    });

    return (
        <CookiesProvider>
            <div className="App">
            <Router>
                <Routes>
                        <Route path="/" element={<Main/>}/>
                        <Route path="/login/auth/code" element={<AuthLoading />}/>
                </Routes>
            </Router>
            </div>
        </CookiesProvider>
    );
}

export default App;
