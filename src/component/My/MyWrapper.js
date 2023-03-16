import {useSelector} from "react-redux";
import My from "./My";

function MyWrapper() {
    const sector = useSelector((state) => state.sector.type);

    return sector === "my" ? <My/> : null;
}

export default MyWrapper
