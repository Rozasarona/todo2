import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './Task.css';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = { currentTaskName: '' };
  }

  tryRenderInput = () => {
    const { state } = this.props;
    const { currentTaskName } = this.state;
    if (state === 'editing') {
      return (
        <form onSubmit={this.onEditSubmit}>
          <input
            type="text"
            className="edit"
            value={currentTaskName}
            onChange={this.onEditChange}
            onKeyDown={this.onEditInputKeyDown}/>
        </form>
      );
    }
    return null;
  };

  onEditInputKeyDown = event => {
    if(event.keyCode === 27) {
      this.setState({ currentTaskName: '' });
      const { id, onTaskEditCancel } = this.props;
      onTaskEditCancel(id);
    }
  };

  onEditChange = event => {
    this.setState({ currentTaskName: event.target.value });
  };

  onEditSubmit = (event) => {
    event.preventDefault();
    const { id, onTaskLabelUpdate } = this.props;
    const { currentTaskName } = this.state;
    onTaskLabelUpdate(id, currentTaskName);
  };

  onCheckboxChange = () => {
    const { id, onTaskCheckboxChange } = this.props;
    onTaskCheckboxChange(id);
  };

  deleteTask = () => {
    const { id, onDelited } = this.props;
    onDelited(id);
  };

  onClickEdit = () => {
    const { id, label, onTaskEdit } = this.props;
    this.setState({ currentTaskName: label });
    onTaskEdit(id);

   
  };

  tryRenderEditButton = () => {
    const { state } = this.props;
    if(state !== 'completed') {
      return(
        <button
          type="button"
          aria-label="Edit task"
          className="icon icon-edit"
          onClick = { this.onClickEdit } />
      );
    }
    return null;
  };



  render() {
    const { date, label, state } = this.props;
    return (
      <li className= { state }>
              <div className="view">
                <input onChange = { this.onCheckboxChange } className="toggle" type="checkbox" checked = {state === 'completed'} />
                <label>
                  <span className="description">{ label }</span>
                  <span className="created">created { formatDistanceToNow(date)} ago</span>
                </label>
                {this.tryRenderEditButton()}
                <button
                  type="button"
                  aria-label="Delete task"
                  className="icon icon-destroy"
                  onClick = { this.deleteTask } />
              </div>
              { this.tryRenderInput() }
            </li>
  );
  }
}

Task.propTypes = {
  state: PropTypes.oneOf([ '', 'editing', 'completed' ]).isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onTaskEdit: PropTypes.func.isRequired,
  onDelited: PropTypes.func.isRequired,
  onTaskCheckboxChange: PropTypes.func.isRequired,
  onTaskLabelUpdate: PropTypes.func.isRequired,
  onTaskEditCancel: PropTypes.func.isRequired
};

export default Task;