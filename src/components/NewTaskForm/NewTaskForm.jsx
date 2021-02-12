import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

class NewTaskForm extends Component {
    constructor() {
        super();
        this.state = {
            taskName: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onInput = this.onInput.bind(this);
    }

    onSubmit = (event) => {
        event.preventDefault();
        const { taskName } = this.state;
        const { onTaskCreate } = this.props;
        onTaskCreate(taskName);
        this.setState({ taskName: '' });
    };

    onInput(event) {
        this.setState({ taskName: event.target.value });
    }

    render() {
        const { taskName } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <input value={taskName} onInput={this.onInput} className="new-todo" placeholder="What needs to be done?" />
            </form>
        );
    }
}

NewTaskForm.propTypes = {
    onTaskCreate: PropTypes.func.isRequired
};

export default NewTaskForm;