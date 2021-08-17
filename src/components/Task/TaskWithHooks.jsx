import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import TimerWithHooks from '../Timer/TimerWithHooks';

import './Task.css';


function TaskWithHooks({ date, label, state, secondsDeadline, id, onTaskEditCancel, onTaskLabelUpdate, onTaskCheckboxChange, onDelited, onTaskEdit, onTaskSetDeadLine }) {
    const [currentTaskName, setCurrentTaskName] = useState('');

    const onEditInputKeyDown = event => {
        if(event.keyCode === 27) {
        setCurrentTaskName('');
        onTaskEditCancel(id);
        }
    };

    const onEditChange = event => {
        setCurrentTaskName(event.target.value);
    };

    const onEditSubmit = (event) => {
        event.preventDefault();
        onTaskLabelUpdate(id, currentTaskName);
    };

    const tryRenderInput = () => {
        if (state === 'editing') {
            return (
                <form onSubmit={onEditSubmit}>
                    <input
                        type="text"
                        className="edit"
                        value={currentTaskName}
                        onChange={onEditChange}
                        onKeyDown={onEditInputKeyDown}/>
                </form>
            );
        }
        return null;
    };

    const onCheckboxChange = () => {
        onTaskCheckboxChange(id);
    };

    const deleteTask = () => {
        onDelited(id);
    };

    const onClickEdit = () => {
        setCurrentTaskName(label);
        onTaskEdit(id);
    };

    const tryRenderEditButton = () => {
        if(state !== 'completed') {
            return(
                <button
                type="button"
                aria-label="Edit task"
                className="icon icon-edit"
                onClick = { onClickEdit } />
            );
        }
        return null;
    };

    const onSetDeadLine = (secs) => {
        onTaskSetDeadLine(id, secs);
    };

    return (
        <li className= { state }>
                <div className="view">
                    <input onChange = { onCheckboxChange } className="toggle" type="checkbox" checked = {state === 'completed'} />
                    <label>
                    <span className="title">{ label }</span>
                    <TimerWithHooks secs={ secondsDeadline } onSetDeadLine={ onSetDeadLine } />
                    <span className="description">created { formatDistanceToNow(date) } ago</span>
                    </label>
                    { tryRenderEditButton() }
                    <button
                    type="button"
                    aria-label="Delete task"
                    className="icon icon-destroy"
                    onClick = { deleteTask } />
                </div>
                { tryRenderInput() }
        </li>
    );
}

TaskWithHooks.propTypes = {
    state: PropTypes.oneOf([ '', 'editing', 'completed' ]).isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    label: PropTypes.string.isRequired,
    secondsDeadline: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    onTaskEdit: PropTypes.func.isRequired,
    onDelited: PropTypes.func.isRequired,
    onTaskCheckboxChange: PropTypes.func.isRequired,
    onTaskLabelUpdate: PropTypes.func.isRequired,
    onTaskEditCancel: PropTypes.func.isRequired,
    onTaskSetDeadLine: PropTypes.func.isRequired
};

export default TaskWithHooks;