import './App.css';
import React from 'react';
import Header from '../Header/Header';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

class App extends React.Component {
  constructor() {
    super();
this.state = {
  tasks: [
    { id: 1, state: 'completed', label: 'Сделать 50 отжиманий' },
    { id: 2, state: 'editing', label: 'Купить подарки' },
    { id: 3, state: '', label: 'Помыть котэ' },
    { id: 4, state: '', label: 'Сделать 50 отжиманий' },
    { id: 5, state: '', label: 'Купить подарки' },
    { id: 6, state: '', label: 'Помыть котэ' }
  ]
};
this.onTaskCheckboxChange = this.onTaskCheckboxChange.bind(this);
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
  // this.setState((state) => {
  //   return {
  //     tasks: state.tasks.map((item) => ({
  //       ...item,
  //       state: item.id !== taskId
  //         ? item.state
  //         : (item.state === 'completed'
  //             ? ''
  //             : (item.state === ''
  //                 ? 'completed' : item.state))
  //     }))

  }

  deleteTask = (taskId) => {
    //console.log(id);
    const arrTasks = this.state.tasks.filter((item) => item.id !== taskId);

    this.setState({ tasks: arrTasks });
  }

  

  render() {
      return (
          <section className="todoapp">
            <Header />
            <section className="main">
              <TaskList
                tasksArray = { this.state.tasks }
                onTaskCheckboxChange = { this.onTaskCheckboxChange }
                onDelited = { this.deleteTask }/>
              <Footer />
            </section>
          </section>
      )
  }
  
}

export default App;