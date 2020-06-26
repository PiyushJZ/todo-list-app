import React from "react";
import ReactDOM from "react-dom";

let id = 0;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }
  render() {
    return (
      <div>
        <h1>ToDo App</h1>
        <div>Total Tasks: {this.state.tasks.length} </div>
        <div>
          Unchecked Tasks:{" "}
          {this.state.tasks.filter(todo => !todo.checked).length}
        </div>
        Task Name:
        <input
          id="textbox"
          type="text"
          placeholder="Task Name"
          style={{ margin: 10 }}
        />
        <br />
        <input
          type="button"
          value="Add Task"
          style={{ margin: 10, width: 100 }}
          onClick={() => this.addTodo()}
        />
        <ol>
          {this.state.tasks.map(task => (
            <li>
              <Task
                onToggle={() => this.toggleTodo(task.id)}
                onDelete={() => this.deleteTodo(task.id)}
                task={task}
              />
            </li>
          ))}
        </ol>
      </div>
    );
  }

  addTodo() {
    // add a new task.
    const text = document.getElementById("textbox").value;
    document.getElementById("textbox").value = "";
    this.setState({
      tasks: [
        ...this.state.tasks,
        { id: id++, text: text, checked: false }
      ]
    });
  }

  deleteTodo(id) {
    // delete the task
    this.setState({
      tasks: this.state.tasks.filter(task => task.id !== id)
    });
  }

  toggleTodo(id) {
    // change the status of the task.
    this.setState({
      tasks: this.state.tasks.map(task => {
        if (task.id !== id) return task;
        return {
          id: task.id,
          text: task.text,
          checked: !task.checked,
        };
      })
    });
  }
}

function Task(props) {
  return (
    <div style={{ margin: 10 }}>
      <input
        type="checkbox"
        onChange={props.onToggle}
        checked={props.task.checked}
      />
      <span style={{ marginLeft: 5 }}>
        {props.task.text}
      </span>
      <button
        style={{ position: "absolute", right: 10 }}
        onClick={props.onDelete}
      >
        Delete
      </button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
