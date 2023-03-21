import {useSelector} from "react-redux";
import FavoriteNote from "../FavoriteNote";

function FavoriteWrapper(){
    const open = useSelector((state) => state.myPage.favoriteOpen)
    return open ? <FavoriteNote/> : null;
}

export default FavoriteWrapper
