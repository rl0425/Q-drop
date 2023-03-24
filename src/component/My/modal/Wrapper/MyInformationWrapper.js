import {useSelector} from "react-redux";
import MyInformation from "../MyInformation";

function MyInformationWrapper(){
    const open = useSelector((state) => state.myPage.myInformation)
    return open ? <MyInformation/> : null;
}

export default MyInformationWrapper
