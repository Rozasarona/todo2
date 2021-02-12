import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';
import TasksFilter from '../TasksFilter/TasksFilter';

function Footer({uncompletedTasksCount, onClearCompleted, filterValue, onFilterUpdate}) {
    return (
        <footer className="footer">
            <span className="todo-count">{uncompletedTasksCount} items left</span>
            <TasksFilter filterValue={filterValue} onFilterUpdate={onFilterUpdate} />
            <button type = "button" onClick={onClearCompleted} className="clear-completed">Clear completed</button>
        </footer>
    );
}

Footer.propTypes = {
    uncompletedTasksCount: PropTypes.number.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
    filterValue: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
    onFilterUpdate: PropTypes.func.isRequired
};

export default Footer;