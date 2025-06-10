import { useDispatch } from "react-redux";
import { setCharacter } from "../features/game/gameSlice";

const Character = () => {
  const dispatch = useDispatch();

  const characters = ["frog", "hen", "duck", "crab", "cat"];

  return (
    <div>
      <p className="text-left">Select your Character:</p>
      <p className="px-6 flex justify-around items-center mb-10">
        {characters.map((character, i) => (
          <img
            src={require(`../assets/images/${character}.png`)}
            alt={character}
            className="h-20"
            key={i}
            onClick={() => {
              dispatch(setCharacter(character));
            }}
          />
        ))}
      </p>
    </div>
  );
};

export default Character;
