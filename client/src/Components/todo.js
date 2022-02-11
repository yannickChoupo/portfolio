// import react from "react";

export default function Todo(props) {
    // const [newName, setNewName] = useState('');

    // useEffect(() => {
    //     // console.log("Todo")
    // })

    // function handleChange(e) {
    //     setNewName(e.target.value);
    // }

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     props.editTask(props.id, newName);
    //     setNewName("");
    //     setEditing(false);
    // }
    return (
        <li className="todo stack-small"
            id={props.todo.id}>
            <div>
                {props.todo.description}
            </div>
            <button
                type="button"
                className="btn btn__danger"
                onClick={() => props.deleteTask(props.todo.id)}>
                Delete
            </button>
        </li>
    );
}