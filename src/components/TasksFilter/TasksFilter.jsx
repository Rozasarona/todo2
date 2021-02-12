import React from 'react';
import PropTypes from 'prop-types';
import './TasksFilter.css';

function TasksFilter({filterValue, onFilterUpdate}) {
    const getClassName = (buttonType) => buttonType === filterValue ? 'selected' : null;

    return (
        <ul className="filters">
                <li><button type="button" onClick={() => onFilterUpdate('all')} className={getClassName('all')}>All</button></li>
                <li><button type="button" onClick={() => onFilterUpdate('active')} className={getClassName('active')}>Active</button></li>
                <li><button type="button" onClick={() => onFilterUpdate('completed')} className={getClassName('completed')}>Completed</button></li>
              </ul>
    );
}

TasksFilter.propTypes = {
    filterValue: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
    onFilterUpdate: PropTypes.func.isRequired
};

export default TasksFilter;