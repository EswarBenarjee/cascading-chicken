import { createSlice } from "@reduxjs/toolkit";
import Description from "../../components/Description";

const initialState = {
  level: 1,
  code: "",
  playerPosition: { row: 0, col: 0 },
  levelPassed: false,
  description: ""
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },
    movePlayer: (state, action) => {
      state.playerPosition = action.payload;
    },
    passLevel: (state) => {
      state.levelPassed = true;
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
          state.description = "";
        } catch (e) {
          state.code = "";
          state.levelPassed = false;
          state.playerPosition = { row: 0, col: 0 };
          state.description = "";
        }
      } else {
        state.code = "";
        state.levelPassed = false;
        state.playerPosition = { row: 0, col: 0 };
        state.description = "";
      }
    },
  },
});

export const { setCode, movePlayer, passLevel, nextLevel } = gameSlice.actions;
export default gameSlice.reducer;
