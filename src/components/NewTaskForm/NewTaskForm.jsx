import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

class NewTaskForm extends Component {
    constructor() {
        super();
        this.state = {
            taskName: '',
            estimateMinutes: '',
            estimateSeconds: ''
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        const { taskName, estimateMinutes, estimateSeconds } = this.state;
        const { onTaskCreate } = this.props;
        const mins = Number.parseInt(estimateMinutes, 10);
        const secs = Number.parseInt(estimateSeconds, 10);
        onTaskCreate(taskName, mins, secs);
        this.setState({ taskName: '', estimateMinutes: '', estimateSeconds: '' });
    };

    onTaskNameInput = (event) => {
        this.setState({ taskName: event.target.value });
    }

    onEstimateMinutesInput = (event) => {
        this.setState({ estimateMinutes: event.target.value });
    };

    onEstimateSecondsInput = (event) => {
        this.setState({ estimateSeconds: event.target.value });
    };

    render() {
        const { taskName, estimateMinutes, estimateSeconds } = this.state;
        return (
            <form className="new-todo-form" onSubmit={this.onSubmit}>
                <input value={taskName} onInput={this.onTaskNameInput} className="new-todo" placeholder="What needs to be done?" />
                <input value={estimateMinutes} onInput={this.onEstimateMinutesInput} className="new-todo-form__timer" placeholder="Min" />
                <input value={estimateSeconds} onInput={this.onEstimateSecondsInput} className="new-todo-form__timer" placeholder="Sec" />
                <input type="submit" style={{display: "none"}} />
            </form>
        );
    }
}

NewTaskForm.propTypes = {
    onTaskCreate: PropTypes.func.isRequired
};

export default NewTaskForm;