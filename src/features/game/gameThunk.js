import { setCode, movePlayer, passLevel, nextLevel } from "./gameSlice";

export const goToNextLevel = () => (dispatch, getState) => {
  const { game } = getState();

  // Save current level
  const saveData = {
    code: game.code,
    playerPosition: game.playerPosition,
    levelPassed: game.levelPassed,
  };
  localStorage.setItem(
    "cascadingchickenlevel" + game.level,
    JSON.stringify(saveData)
  );

  // Load next level (if exists)
  const nextLevelRaw = localStorage.getItem(
    "cascadingchickenlevel" + (game.level + 1)
  );

  dispatch(nextLevel()); // still handles incrementing level

  if (nextLevelRaw) {
    try {
      const nextLevelData = JSON.parse(nextLevelRaw);
      dispatch(setCode(nextLevelData.code || ""));
      dispatch(movePlayer(nextLevelData.playerPosition || { row: 0, col: 0 }));
      if (nextLevelData.levelPassed) dispatch(passLevel());
    } catch (err) {
      console.error("Failed to load next level:", err);
    }
  } else {
    // Reset state for new level
    dispatch(setCode(""));
    dispatch(movePlayer({ row: 0, col: 0 }));
  }
};
