import { createSlice } from "@reduxjs/toolkit";
import levels from "../../utils/levels.json";

const getLevelData = (level) => {
  return levels[level];
};

const initialState = {
  level: 0,
  code: "",
  playerPosition: { row: 0, col: 0 },
  levelPassed: false,
  gameStarted: true,
  levelData: getLevelData(0),
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setGameStart: (state, action) => {
      state.gameStarted = action.payload;
      state.level = 0;
      state.levelData = getLevelData(1);
    },
    movePlayer: (state, action) => {
      state.playerPosition = action.payload;
    },
    passLevel: (state) => {
      state.levelPassed = true;
      nextLevel();
    },
    nextLevel: (state) => {
      // Save current level state
      const saveData = {
        code: state.code,
        playerPosition: state.playerPosition,
        levelPassed: state.levelPassed,
      };
      localStorage.setItem(
        "cascadingchickenlevel" + state.level,
        JSON.stringify(saveData)
      );

      // Move to next level
      state.level++;

      const nextLevelRaw = localStorage.getItem(
        "cascadingchickenlevel" + state.level
      );

      if (nextLevelRaw) {
        try {
          const nextLevelData = JSON.parse(nextLevelRaw);
          state.code = nextLevelData.code || "";
          state.levelPassed = !!nextLevelData.levelPassed;
          state.playerPosition = nextLevelData.playerPosition || {
            row: 0,
            col: 0,
          };
          state.levelData = getLevelData(state.levelPassed || 1);
        } catch (e) {
          state.code = "";
          state.levelPassed = false;
          state.playerPosition = { row: 0, col: 0 };
          state.levelData = getLevelData(0);
        }
      } else {
        state.code = "";
        state.levelPassed = false;
        state.playerPosition = { row: 0, col: 0 };
        state.levelData = getLevelData(0);
      }
    },
  },
});

export const { setCode, movePlayer, passLevel, nextLevel, setGameStart } =
  gameSlice.actions;
export default gameSlice.reducer;
