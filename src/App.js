import "./styles/App.css";
import LevelTitle from "./components/LevelTitle";
import StartGame from "./pages/StartGame";
import CodeEditor from "./components/CodeEditor";
import Description from "./components/Description";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const gameStarted = useSelector((state) => state.game.gameStarted);

  return (
    <div className="App flex flex-row justify-around items-center h-screen">
      {gameStarted ? (
        <>
          <div className="left-panel h-full w-full">GAME!</div>
          <div className="right-panel h-full w-full">
            <LevelTitle />
            <CodeEditor />
            <Description />
          </div>
        </>
      ) : (
        <StartGame />
      )}
    </div>
  );
}

export default App;
