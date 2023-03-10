import classes from "./Content.module.css"

function Content(props){
    console.log("props =" ,props)

    return (
        <div>
            <span>{props.data.name}</span>
        </div>
    )
}

export default Content
