import {useSelector} from "react-redux";
import Terms from "../Terms";

function TermsWrapper(){
    const open = useSelector((state) => state.myPage.termsOpen)
    return open ? <Terms/> : null;
}

export default TermsWrapper
