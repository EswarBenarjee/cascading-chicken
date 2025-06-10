import "./styles/App.css";
import LevelTitle from "./components/LevelTitle";
import StartGame from "./pages/StartGame";
import CodeEditor from "./components/CodeEditor";
import Character from "./components/Character";
import ChangeLevels from "./components/ChangeLevels";
import Description from "./components/Description";
import GameGrid from "./components/GameGrid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { moveCharacter } from "./features/game/gameSlice";

function App() {
  const dispatch = useDispatch();
  const gameStarted = useSelector((state) => state.game.gameStarted);
  const levelData = useSelector((state) => state.game.levelData);

  useEffect(() => {
    let intervalId;

    if (!levelData.canCharacterMove) {
      intervalId = setInterval(() => {
        dispatch(moveCharacter());
      }, 2000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [levelData.canCharacterMove, dispatch]);

  return (
    <div className="App flex flex-row justify-around items-center h-screen">
      {gameStarted ? (
        <>
          <div className="h-full w-full">
            <GameGrid />
          </div>
          <div className="p-6 bg-white shadow-sm hover:bg-gray-100 h-full w-full hidden lg:inline">
            <div className="flex flex-col justify-between w-full h-full">
              <div>
                <LevelTitle />
                <CodeEditor />
                <Description />
              </div>
              <div>
                <Character />
                <ChangeLevels />
              </div>
            </div>
          </div>
        </>
      ) : (
        <StartGame />
      )}
    </div>
  );
}

export default App;
