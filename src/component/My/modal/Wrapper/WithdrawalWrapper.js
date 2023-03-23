import {useSelector} from "react-redux";
import Withdrawal from "../Withdrawal";

function WithdrawalWrapper(){
    const open = useSelector((state) => state.myPage.WithdrawalOpen)
    return open ? <Withdrawal/> : null;
}

export default WithdrawalWrapper
