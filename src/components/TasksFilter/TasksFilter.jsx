import React from 'react';
import PropTypes from 'prop-types';
import './TasksFilter.css';
import * as FilterValues from '../tasksFilterValues';

function TasksFilter({filterValue, onFilterUpdate}) {
    const getClassName = (buttonType) => buttonType === filterValue ? 'selected' : null;

    return (
        <ul className="filters">
            <li><button type="button" onClick={() => onFilterUpdate(FilterValues.ALL)} className={getClassName('FilterValues.ALL')}>All</button></li>
            <li><button type="button" onClick={() => onFilterUpdate(FilterValues.ACTIVE)} className={getClassName('FilterValues.ACTIVE')}>Active</button></li>
            <li><button type="button" onClick={() => onFilterUpdate(FilterValues.COMPLETED)} className={getClassName('FilterValues.COMPLETED')}>Completed</button></li>
        </ul>
    );
}

TasksFilter.propTypes = {
    filterValue: PropTypes.oneOf(['FilterValues.ALL', 'FilterValues.ACTIVE', 'FilterValues.COMPLETED']).isRequired,
    onFilterUpdate: PropTypes.func.isRequired
};

export default TasksFilter;