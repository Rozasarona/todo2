import './App.css';
import React, {Component} from 'react';
import Header from '../Header/Header';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

class App extends Component {

  constructor() {
    super();
    this.state = {
      tasks: [
        { id: 1, state: 'completed', label: 'Сделать 50 отжиманий' },
        { id: 2, state: '', label: 'Купить подарки' },
        { id: 3, state: '', label: 'Помыть котэ' },
        { id: 4, state: '', label: 'Сделать 50 отжиманий' }
      ],
      nextId: 7,
      filterValue: 'all'
    };
    this.onTaskCheckboxChange = this.onTaskCheckboxChange.bind(this);
    this.onTaskCreate = this.onTaskCreate.bind(this);
  }

  onTaskEdit = (taskId) => {

    const editingTask = this.state.tasks.find((item) => item.id === taskId);
    const newTask = { ...editingTask };
    newTask.state = 'editing';
    const oldTasks = this.state.tasks;
    const newTasks = oldTasks.map((item) => {
      if(item.id === taskId) {
        return newTask;
      } else {
        if(item.state === 'editing') {
          const newItem = { ...item };
            newItem.state = '';
            return newItem;
        }
        return item;
      }
    });

    this.setState({tasks: newTasks});
  }



  onTaskCheckboxChange(taskId) {
    const task = this.state.tasks.find((item) => item.id === taskId);
    const newTask = { ...task};
    if(newTask.state === 'completed') {
      newTask.state = '';
    }
    else {
      if(newTask.state === '') {
        newTask.state = 'completed';
      }
    }

    this.setState ((state) => {
      return {
        tasks: state.tasks.map((item) => (item.id === taskId ? newTask : { ...item}))
      };
    })
  }

  deleteTask = (taskId) => {
    const arrTasks = this.state.tasks.filter((item) => item.id !== taskId);

    this.setState({ tasks: arrTasks });
  }

  onTaskCreate(taskName) {
    if(taskName === null || taskName === undefined) return;
    taskName = taskName.trim();
    if(taskName === '' ) return;

    this.setState((oldState) => ({
          tasks: [...oldState.tasks, {
            id: oldState.nextId,
            state: '',
            label: taskName
          }],
          nextId: oldState.nextId + 1
    }));
  }

  onTaskLabelUpdate = (taskId, newTaskLabel) => {
    this.setState(oldState => ({
      tasks: oldState.tasks.map(x => x.id !== taskId ? x : {
        ...x,
        label: newTaskLabel,
        state: ''
      })
    }));
  };

  onTaskEditCancel = (taskId) => {
    this.setState(oldState => ({
      tasks: oldState.tasks.map(x => x.id !== taskId ? x : {
        ...x,
        state: ''
      })
    }));
  };

  onClearCompleted = () => {
    this.setState(oldState => ({
      tasks: oldState.tasks.filter(x => x.state !== 'completed')
    }));
  };

  onFilterUpdate = (newFilterValue) => {
    this.setState({ filterValue: newFilterValue });
  };

  render() {
      const uncompletedTasksCount = this.state.tasks.filter(x => x.state !== 'completed').length;
      const filteredTasks = this.state.tasks.filter(x => {
        switch(this.state.filterValue) {
          case 'active':
            return x.state != 'completed';
          case 'completed':
            return x.state === 'completed';
          default:
            return true;
        }
      });

      return (
          <section className="todoapp">
            <Header onTaskCreate={this.onTaskCreate} />
            <section className="main">
              <TaskList
                tasksArray = { filteredTasks }
                onTaskCheckboxChange = { this.onTaskCheckboxChange }
                onDelited = { this.deleteTask }
                onTaskEdit = { this.onTaskEdit }
                onTaskLabelUpdate = {this.onTaskLabelUpdate}
                onTaskEditCancel={this.onTaskEditCancel} />
              <Footer
                uncompletedTasksCount={uncompletedTasksCount}
                onClearCompleted={this.onClearCompleted}
                filterValue={this.state.filterValue}
                onFilterUpdate={this.onFilterUpdate} />
            </section>
          </section>
      )
  }
}

export default App;