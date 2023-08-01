import {useSelector} from "react-redux";
import Search from "./Search";

function SearchWrapper(){
    const open = useSelector((state) => state.search.open)
    return open ? <Search/> : null;
}

export default SearchWrapper
