import { createSlice } from "@reduxjs/toolkit";
import levels from "../../utils/levels.json";

const getLevelData = (level) => {
  return levels[level];
};

const initialState = {
  level: 0,
  code: "",
  playerPosition: getLevelData(0).frog,
  levelPassed: false,
  gameStarted: true,
  levelData: getLevelData(0),
  character: "crab",
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
      state.levelData = getLevelData(0);
    },
    movePlayer: (state, action) => {
      state.playerPosition = action.payload;
    },
    passLevel: (state) => {
      state.levelPassed = true;
      nextLevel();
    },
    nextLevel: (state) => {
      const saveData = {
        code: state.code,
        playerPosition: state.playerPosition,
        levelPassed: state.levelPassed,
      };
      localStorage.setItem(
        "cascadingchickenlevel" + state.level,
        JSON.stringify(saveData)
      );

      state.level++;

      const nextLevelRaw = localStorage.getItem(
        "cascadingchickenlevel" + state.level
      );

      if (nextLevelRaw) {
        try {
          const nextLevelData = JSON.parse(nextLevelRaw);
          state.code = nextLevelData.code || "";
          state.levelPassed = !!nextLevelData.levelPassed;
          state.levelData = getLevelData(state.levelPassed || 1);
          state.playerPosition = state.levelData.frog;
        } catch (e) {
          state.code = "";
          state.levelPassed = false;
          state.levelData = getLevelData(0);
          state.playerPosition = state.levelData.frog;
        }
      } else {
        state.code = "";
        state.levelPassed = false;
        state.levelData = getLevelData(state.level);
        state.playerPosition = state.levelData.frog;
      }
    },
    prevLevel: (state) => {
      const saveData = {
        code: state.code,
        playerPosition: state.playerPosition,
        levelPassed: state.levelPassed,
      };
      localStorage.setItem(
        "cascadingchickenlevel" + state.level,
        JSON.stringify(saveData)
      );

      state.level--;

      const nextLevelRaw = localStorage.getItem(
        "cascadingchickenlevel" + state.level
      );

      if (nextLevelRaw) {
        try {
          const nextLevelData = JSON.parse(nextLevelRaw);
          state.code = nextLevelData.code || "";
          state.levelPassed = !!nextLevelData.levelPassed;
          state.levelData = getLevelData(state.levelPassed || 1);
          state.playerPosition = state.levelData.frog;
        } catch (e) {
          state.code = "";
          state.levelPassed = false;
          state.levelData = getLevelData(0);
          state.playerPosition = state.levelData.frog;
        }
      } else {
        state.code = "";
        state.levelPassed = false;
        state.levelData = getLevelData(state.level);
        state.playerPosition = state.levelData.frog;
      }
    },
    setCharacter: (state, action) => {
      state.character = action.payload;
    },
    moveCharacter: (state) => {
      if (state.playerPosition[0] > 0) {
        state.playerPosition = [
          state.playerPosition[0] - 1,
          state.playerPosition[1],
        ];
        console.log(state.playerPosition)
      }
    },
  },
});

export const {
  setCode,
  movePlayer,
  passLevel,
  prevLevel,
  nextLevel,
  setGameStart,
  setCharacter,
  moveCharacter,
} = gameSlice.actions;
export default gameSlice.reducer;
