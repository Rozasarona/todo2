import React from 'react';
import PropTypes from 'prop-types';
import './TaskList.css';
import Task from '../Task/Task'

function TaskList({ tasksArray,  onTaskCheckboxChange, onDelited, onTaskEdit, onTaskLabelUpdate, onTaskEditCancel, onTaskSetDeadLine }) {
    
    return (
        <ul className="todo-list">
          {tasksArray.map((item) => (
              <Task
                state={item.state}
                label={item.label}
                minutesDeadline={item.minutesDeadline}
                secondsDeadline={item.secondsDeadline}
                id = {item.id}
                key = {item.id}
                date = {item.date}
                onTaskCheckboxChange = {onTaskCheckboxChange}
                onDelited = { onDelited }
                onTaskEdit = { onTaskEdit }
                onTaskLabelUpdate={onTaskLabelUpdate}
                onTaskEditCancel={onTaskEditCancel}
                onTaskSetDeadLine={onTaskSetDeadLine} />
            ))}
        </ul>
    );
}

TaskList.propTypes = {
  tasksArray: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number,
    state: PropTypes.oneOf(['', 'editing', 'completed']),
    label: PropTypes.string,
    date: PropTypes.instanceOf(Date)
  })).isRequired,
  onTaskCheckboxChange: PropTypes.func.isRequired,
  onDelited: PropTypes.func.isRequired,
  onTaskEdit: PropTypes.func.isRequired,
  onTaskLabelUpdate: PropTypes.func.isRequired,
  onTaskEditCancel: PropTypes.func.isRequired,
  onTaskSetDeadLine: PropTypes.func.isRequired
};

export default TaskList;