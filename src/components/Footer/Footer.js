import './Footer.css';
import TasksFilter from '../TasksFilter/TasksFilter';

function Footer({uncompletedTasksCount, onClearCompleted, filterValue, onFilterUpdate}) {
    return (
        <footer className="footer">
            <span className="todo-count">{uncompletedTasksCount} items left</span>
            <TasksFilter filterValue={filterValue} onFilterUpdate={onFilterUpdate} />
            <button onClick={onClearCompleted} className="clear-completed">Clear completed</button>
        </footer>
    );
}

export default Footer;