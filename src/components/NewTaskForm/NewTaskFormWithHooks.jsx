import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import './NewTaskForm.css';

function NewTaskFormWithHooks({ onTaskCreate }) {
    const [taskName, setTaskName] = useState('');
    const [estimateMinutes, setEstimateMinutes] = useState('');
    const [estimateSeconds, setEstimateSeconds] = useState('');

    onSubmit = (event) => {
        event.preventDefault();
        const mins = Number.parseInt(estimateMinutes, 10);
        const secs = Number.parseInt(estimateSeconds, 10);
        onTaskCreate(taskName, mins, secs);
        this.setState({ taskName: '', estimateMinutes: '', estimateSeconds: '' });
    };

    onTaskNameInput = (event) => {
        setTaskName(event.target.value);
    }

    onEstimateMinutesInput = (event) => {
        setEstimateMinutes(event.target.value);
    };

    onEstimateSecondsInput = (event) => {
        setEstimateSeconds(event.target.value);
    };

    NewTaskFormWithHooks.propTypes = {
    onTaskCreate: PropTypes.func.isRequired
    };

    return (
        <form className="new-todo-form" onSubmit={ onSubmit }>
            <input value={taskName} onInput={ onTaskNameInput } className="new-todo" placeholder="What needs to be done?" />
            <input value={estimateMinutes} onInput={ onEstimateMinutesInput } className="new-todo-form__timer" placeholder="Min" />
            <input value={estimateSeconds} onInput={ onEstimateSecondsInput } className="new-todo-form__timer" placeholder="Sec" />
            <input type="submit" style={{display: "none"}} />
        </form>
    );
}

export default NewTaskFormWithHooks;