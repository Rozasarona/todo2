import './Header.css';
import NewTaskForm from './NewTaskForm';

function Header() {
    return (
        <header className="header">
            <h1>todos</h1>
            <NewTaskForm />
          </header>
    );
}

export default Header;