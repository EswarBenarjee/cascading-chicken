import { useSelector } from "react-redux";

const LevelTitle = () => {
  const level = useSelector((state) => state.game.level);

  return (
    <h1 class="mb-10 text-xl font-extrabold leading-none tracking-tight text-gray-900 lg:text-4xl">
      Level {level}
    </h1>
  );
};

export default LevelTitle;
