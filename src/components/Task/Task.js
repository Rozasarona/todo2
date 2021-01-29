import { Component } from 'react';
import './Task.css';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = { currentTaskName: '' };
  }

  tryRenderInput = () => {
    if (this.props.state === 'editing') {
      return (
        <form onSubmit={this.onEditSubmit}>
          <input
            type="text"
            className="edit"
            value={this.state.currentTaskName}
            onChange={this.onEditChange}
            onKeyDown={this.onEditInputKeyDown}/>
        </form>
      );
    }
  };

  onEditInputKeyDown = event => {
    if(event.keyCode === 27) {
      this.setState({ currentTaskName: '' });
      this.props.onTaskEditCancel(this.props.id);
    }
  };

  onEditChange = event => {
    this.setState({ currentTaskName: event.target.value });
  };

  onEditSubmit = (event) => {
    event.preventDefault();
    this.props.onTaskLabelUpdate(this.props.id, this.state.currentTaskName);
  };

  onCheckboxChange = () => {
    this.props.onTaskCheckboxChange(this.props.id);
  };

  deleteTask = () => {
    this.props.onDelited(this.props.id);
  };

  onClickEdit = () => {
    this.setState({ currentTaskName: this.props.label });
    this.props.onTaskEdit(this.props.id);
  };

  tryRenderEditButton = () => {
    if(this.props.state !== 'completed') {
      return(
        <button
          className="icon icon-edit"
          onClick = { this.onClickEdit }></button>
      );
    }
  };

  render() {
    return (
      <li className= { this.props.state }>
              <div className="view">
                <input onChange = { this.onCheckboxChange } className="toggle" type="checkbox" checked = {this.props.state === 'completed'} />
                <label>
                  <span className="description">{ this.props.label }</span>
                  <span className="created">created 17 seconds ago</span>
                </label>
                {this.tryRenderEditButton()}
                <button
                  className="icon icon-destroy"
                  onClick = { this.deleteTask }></button>
              </div>
              { this.tryRenderInput() }
            </li>
  );
  }
}

export default Task;