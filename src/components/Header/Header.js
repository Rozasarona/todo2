import './Header.css';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

function Header(props) {
    return (
        <header className="header">
            <h1>todos</h1>

            <NewTaskForm onTaskCreate={props.onTaskCreate} />
        </header>
    );
}

export default Header;