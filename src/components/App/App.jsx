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
        { id: 1, state: 'completed', label: 'Сделать 50 отжиманий', date: new Date() },
        { id: 2, state: '', label: 'Купить подарки', date: new Date() },
        { id: 3, state: '', label: 'Помыть котэ', date: new Date() },
        { id: 4, state: '', label: 'Сделать 50 отжиманий', date: new Date() }
      ],
      nextId: 7,
      filterValue: 'all'
    };
    this.onTaskCheckboxChange = this.onTaskCheckboxChange.bind(this);
    this.onTaskCreate = this.onTaskCreate.bind(this);
  }

  onTaskEdit = (taskId) => {

    const { tasks } = this.state;
    const editingTask = tasks.find((item) => item.id === taskId);
    const newTask = { ...editingTask };
    newTask.state = 'editing';

    const newTasks = tasks.map((item) => {
      if(item.id === taskId) {
        return newTask;

        
      } 
        if(item.state === 'editing') {
          const newItem = { ...item };
            newItem.state = '';
            return newItem;
        }
        return item;
      
    });

    this.setState({tasks: newTasks});
  }



  onTaskCheckboxChange(taskId) {
    const { tasks } = this.state;
    const task = tasks.find((item) => item.id === taskId);
    const newTask = { ...task};
    if(newTask.state === 'completed') {
      newTask.state = '';
    }
    else if(newTask.state === '') {
        newTask.state = 'completed';
      }

    this.setState ((state) => ({
        tasks: state.tasks.map((item) => (item.id === taskId ? newTask : { ...item}))
      }))
  }

  

  onTaskCreate(taskName) {
    let nameOfTask = taskName;
    if(nameOfTask === null || nameOfTask === undefined) return;
    nameOfTask = nameOfTask.trim();
    if(nameOfTask === '' ) return;

    this.setState((oldState) => ({
          tasks: [...oldState.tasks, {
            id: oldState.nextId,
            state: '',
            label: taskName,
            date: new Date()
          }],
          nextId: oldState.nextId + 1
    }));
  }

  deleteTask = (taskId) => {
    const { tasks } = this.state;
    const arrTasks = tasks.filter((item) => item.id !== taskId);

    this.setState({ tasks: arrTasks });
  }

  onTaskLabelUpdate = (taskId, newTaskLabel) => {
    let nameOfTask = newTaskLabel;
    if(nameOfTask === null || nameOfTask === undefined) return;
    nameOfTask = nameOfTask.trim();
    if(nameOfTask === '' ) return;
    this.setState(oldState => ({
      tasks: oldState.tasks.map(task => task.id !== taskId ? task : {
        ...task,
        label: newTaskLabel,
        state: ''
      })
    }));
  };

  onTaskEditCancel = (taskId) => {
    this.setState(oldState => ({
      tasks: oldState.tasks.map(task => task.id !== taskId ? task : {
        ...task,
        state: ''
      })
    }));
  };

  onClearCompleted = () => {
    this.setState(oldState => ({
      tasks: oldState.tasks.filter(task => task.state !== 'completed')
    }));
  };

  onFilterUpdate = (newFilterValue) => {
    this.setState({ filterValue: newFilterValue });
  };

  render() {
    const { tasks } = this.state;
      const uncompletedTasksCount = tasks.filter(task => task.state !== 'completed').length;
      const { filterValue } = this.state;
      const filteredTasks = tasks.filter(task => {
        switch(filterValue) {
          case 'active':
            return task.state !== 'completed';
          case 'completed':
            return task.state === 'completed';
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
                filterValue={filterValue}
                onFilterUpdate={this.onFilterUpdate} />
            </section>
          </section>
      )
  }
}

export default App;