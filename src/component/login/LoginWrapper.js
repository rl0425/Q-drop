import {useSelector} from "react-redux";
import Login from "./Login";

function LoginWrapper(){
    const open = useSelector((state) => state.login.open)
    return open ? <Login/> : null;
}

export default LoginWrapper
