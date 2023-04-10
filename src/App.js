import Main from "./component/Main";
import Entry from "./component/entry/Entry";
import {useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AuthLoading from "./component/My/AuthLoading";
import {CookiesProvider, useCookies} from 'react-cookie';
import useHttp from "./hooks/use-http";
import {useDispatch} from "react-redux";
import {mainDataActions} from "./store/mianData-slice";
import UserAppSetWrapper from "./component/signUp/UserAppSetWrapper";
import AgreeTerms from "./component/signUp/AgreeTerms";


function App() {
    const dispatch = useDispatch()
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

    useEffect(() => {
        setScreenSize();

        if(cookies.jwt) {
            getLoginData()
        }
    }, []);

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
                        <Route path="/" element={<Entry/>}/>
                        <Route path="/main" element={<Main/>}/>
                        <Route path="/signup" element={<UserAppSetWrapper />}/>
                        <Route path="/login/auth/code" element={<AuthLoading />}/>
                </Routes>
            </Router>
            </div>
        </CookiesProvider>
    );
}

export default App;
