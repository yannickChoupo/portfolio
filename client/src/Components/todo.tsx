export default function Todo(props) {
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