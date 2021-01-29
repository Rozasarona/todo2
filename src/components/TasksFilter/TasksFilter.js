import './TasksFilter.css';

function TasksFilter({filterValue, onFilterUpdate}) {
    const getClassName = (buttonType) => buttonType === filterValue ? 'selected' : null;

    return (
        <ul className="filters">
                <li><button onClick={() => onFilterUpdate('all')} className={getClassName('all')}>All</button></li>
                <li><button onClick={() => onFilterUpdate('active')} className={getClassName('active')}>Active</button></li>
                <li><button onClick={() => onFilterUpdate('completed')} className={getClassName('completed')}>Completed</button></li>
              </ul>
    );
}

export default TasksFilter;