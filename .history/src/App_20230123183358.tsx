import logo from "./logo.svg";
import "./App.css";
import TaskView from "./features/task/Task";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TaskView />
      </header>
    </div>
  );
}

export default App;
