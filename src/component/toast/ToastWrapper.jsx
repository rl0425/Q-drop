import {useSelector} from "react-redux";
import Toast from "./Toast";

function ToastWrapper(){
    const open = useSelector((state) => state.toast.open)
    return open ? <Toast/> : null;
}

export default ToastWrapper
