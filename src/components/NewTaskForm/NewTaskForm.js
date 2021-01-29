import { Component } from 'react';

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
        this.props.onTaskCreate(this.state.taskName);
        this.setState({ taskName: '' });
    };

    onInput(event) {
        this.setState({ taskName: event.target.value });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input value={this.state.taskName} onInput={this.onInput} className="new-todo" placeholder="What needs to be done?" autoFocus/>
            </form>
        );
    }
}

export default NewTaskForm;