import CategoryModal from "./CategoryModal";
import {useSelector} from "react-redux";

function CategoryModalWrapper() {
    const categoryOpen = useSelector((state) => state.category.open);

    return categoryOpen ? <CategoryModal /> : null;
}

export default CategoryModalWrapper
