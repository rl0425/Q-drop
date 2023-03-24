import {useSelector} from "react-redux";
import Withdrawal from "../Withdrawal";
import WithdrawalReasonWrapper from "./WithdrawalReasonWrapper";

function WithdrawalWrapper(){
    const open = useSelector((state) => state.myPage.withdrawalOpen)
    return open ?
        <>
            <Withdrawal/>
            <WithdrawalReasonWrapper />
        </>
        :
        null;
}

export default WithdrawalWrapper
