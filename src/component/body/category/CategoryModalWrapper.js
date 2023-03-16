import CategoryModal from "./CategoryModal";
import {useSelector} from "react-redux";
import {v4 as uuidv4} from "uuid";

function CategoryModalWrapper() {
    const categoryOpen = useSelector((state) => state.category.open);

    return categoryOpen ? <CategoryModal key={uuidv4()}/> : null;
}

export default CategoryModalWrapper
