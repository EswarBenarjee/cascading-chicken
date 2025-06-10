import { useSelector, useDispatch } from "react-redux";
import levels from "../utils/levels.json";
import { nextLevel, prevLevel } from "../features/game/gameSlice";

const ChangeLevels = () => {
  const level = useSelector((state) => state.game.level);
  const dispatch = useDispatch();

  return (
    <p className="px-6 flex justify-between items-center">
      <button
        id="prev"
        disabled={level === 0}
        onClick={() => {
          dispatch(prevLevel());
        }}
      >
        PREVIOUS
      </button>

      <button
        id="next"
        disabled={level === levels.length - 1}
        onClick={() => {
          dispatch(nextLevel());
        }}
      >
        NEXT
      </button>
    </p>
  );
};

export default ChangeLevels;
