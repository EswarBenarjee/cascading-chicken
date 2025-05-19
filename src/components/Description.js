import { useSelector } from "react-redux";

const Description = () => {
  const description = useSelector((state) => state.game.description);

  return (
    <p className="mt-6 text-lg font-normal text-black-500 lg:text-xl dark:text-black-400 text-left">
      Description: {description}
    </p>
  );
};

export default Description;
