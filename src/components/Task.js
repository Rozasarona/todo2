import './Task.css';
const tryRenderInput = (state, label) => {
  if (state === 'editing') {
    return (
      <input type="text" className="edit" value= { label }/>
    );
  }
};


function Task({ state, label, id, onTaskCheckboxChange}) {

  function onCheckboxChange() {
    onTaskCheckboxChange(id);
  }
    return (
        <li className= { state }>
                <div className="view">
                  <input onChange = { onCheckboxChange } className="toggle" type="checkbox" checked = {state === 'completed'} />
                  <label>
                    <span className="description">{ label }</span>
                    <span className="created">created 17 seconds ago</span>
                  </label>
                  <button className="icon icon-edit"></button>
                  <button className="icon icon-destroy"></button>
                </div>
                { tryRenderInput(state,label) }
              </li>
    );
}

export default Task;