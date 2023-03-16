import {useSelector} from "react-redux";
import {v4 as uuidv4} from "uuid";
import Home from "./Home";

function HomeWrapper() {
    const sector = useSelector((state) => state.sector.type);

    return sector === "home" ? <Home/> : null;
}

export default HomeWrapper
