import {useSelector} from "react-redux";
import My from "./My";
import MyInformationWrapper from "./modal/Wrapper/MyInformationWrapper";

function MyWrapper() {
    const sector = useSelector((state) => state.sector.type);

    return sector === "my" ?
        <>
            <My/>
            <MyInformationWrapper/>
        </>
        :
        null;
}

export default MyWrapper
