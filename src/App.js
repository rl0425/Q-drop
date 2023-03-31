import Main from "./component/Main";
import {useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AuthLoading from "./component/My/AuthLoading";
import { CookiesProvider } from 'react-cookie';
import useHttp from "./hooks/use-http";
import {useDispatch} from "react-redux";
import {mainDataActions} from "./store/mianData-slice";


function App() {
    const dispatch = useDispatch()
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    useEffect(() => {
        setScreenSize();
        getLoginData()
    });

    function setScreenSize() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    const getLoginData = (e) => {
        fetchTasks({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/users`}, (data) => {
            if(data) {
                dispatch(mainDataActions.handleProfile({
                    profile: {
                        email: data.email,
                        nickname: data.nickname,
                        image: data.thumbnailImage
                    }
                }))
            }
        })
    }

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
