import {useSelector} from "react-redux";
import Withdrawal from "../Withdrawal";
import WithdrawalReason from "../WithdrawalReason";

function WithdrawalReasonWrapper(){
    const open = useSelector((state) => state.myPage.withdrawalReason.open)
    return open ? <WithdrawalReason/> : null;
}

export default WithdrawalReasonWrapper
