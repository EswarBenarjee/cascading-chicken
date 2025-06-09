import { useSelector } from "react-redux";

const LevelTitle = () => {
  const level = useSelector((state) => state.game.level) + 1;

  return (
    <h1 className="text-xl font-extrabold leading-none tracking-tight text-gray-900 mb-10 lg:text-4xl">
      Level {level}
    </h1>
  );
};

export default LevelTitle;
