import "./styles/App.css";
import LevelTitle from "./components/LevelTitle";
import CodeEditor from "./components/CodeEditor";
import Description from "./components/Description";

function App() {
  return (
    <div className="App flex flex-row justify-around items-center h-screen">
      <div className="left-panel h-full w-full">GAME!</div>
      <div className="right-panel h-full w-full">
        <LevelTitle />
        <CodeEditor />
        <Description />
      </div>
    </div>
  );
}

export default App;
