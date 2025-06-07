import { useDispatch } from "react-redux";
import { setGameStart } from "../features/game/gameSlice";

const StartGame = () => {
  const dispatch = useDispatch();

  const startGame = () => {
    dispatch(setGameStart(true));
  };

  return (
    <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow-lg h-1/2 flex flex-col justify-center items-center">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 mb-8">
        Cascading Chicken
      </h5>
      <p className="mb-3 font-normal text-gray-700">
        Rule number 1: Let the chicken reach finish line.
      </p>
      <p className="mb-3 font-normal text-gray-700 mb-8">
        Rule number 2: Let the chicken drown.
      </p>
      <div
        className="w-1/2 inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        onClick={startGame}
      >
        Start Game
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </div>
    </div>
  );
};

export default StartGame;
