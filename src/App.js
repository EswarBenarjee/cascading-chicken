import "./styles/App.css";
import LevelTitle from "./components/LevelTitle";
import StartGame from "./pages/StartGame";
import CodeEditor from "./components/CodeEditor";
import Description from "./components/Description";
import GameGrid from "./components/GameGrid";
import { useSelector } from "react-redux";

function App() {
  const gameStarted = useSelector((state) => state.game.gameStarted);

  return (
    <div className="App flex flex-row justify-around items-center h-screen">
      {gameStarted ? (
        <>
          <div className="h-full w-full">
            <GameGrid />
          </div>
          <div className="block p-6 bg-white shadow-sm hover:bg-gray-100 h-full w-full hidden lg:inline">
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
