import Grass from "../assets/images/grass.png";
import Lilly from "../assets/images/lilly.png";
import LillyRed from "../assets/images/lilly-red.png";
import Water from "../assets/images/water.png";
import { useDispatch, useSelector } from "react-redux";
import { parseStyle } from "../utils/Util";
import { useEffect } from "react";
import { passLevel } from "../features/game/gameSlice";

const GameGrid = () => {
  const dispatch = useDispatch();
  const code = useSelector((state) => state.game.code);
  const levelData = useSelector((state) => state.game.levelData);
  const playerPosition = useSelector((state) => state.game.playerPosition);
  const character = useSelector((state) => state.game.character);
  const rows = 10;
  const cols = 9;

  const [charRow, charCol] = playerPosition;

  useEffect(() => {
    if (code === levelData?.answer) {
      dispatch(passLevel());
    }
  }, [code, levelData?.answer, dispatch]);

  return (
    <div className="h-screen w-full overflow-hidden">
      <div
        className="grid w-full h-full relative"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {/* Grid Tiles */}
        {[...Array(rows * cols)].map((_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;

          const isGrass = levelData?.grass?.some(
            ([r, c]) => r === row && c === col
          );

          const imgSrc = isGrass ? Grass : Water;

          return (
            <div key={i} className="w-full h-full">
              <img
                src={imgSrc}
                alt="Tile"
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}

        {levelData?.lilly?.map(([row, col], i) => {
          const type = levelData?.lillyTypes
            ? levelData?.lillyTypes[i]
            : "green";
          let lillySrc = type === "red" ? LillyRed : Lilly;

          if (
            code.includes("background-color") &&
            code.includes(":") &&
            code.split(":").length > 1 &&
            levelData?.classToEdit.includes("lilly-" + i)
          ) {
            lillySrc = code.split(":")[1].trim() === "green" ? Lilly : LillyRed;
          }

          const lillyClass = levelData?.lillyClasses
            ? levelData?.lillyClasses[i]
            : "";

          const lillyCustomStyle =
            !code.includes("background-color") &&
            levelData?.classToEdit.includes("lilly-" + i)
              ? parseStyle(code)
              : "";

          return (
            <div
              key={`lilly-${i}`}
              className={"absolute " + lillyClass}
              style={{
                top: `${(row / rows) * 100}%`,
                left: `${(col / cols) * 100}%`,
                width: `${100 / cols}%`,
                height: `${100 / rows}%`,
                ...lillyCustomStyle,
              }}
            >
              <img src={lillySrc} alt="Lilly" className="w-full h-full" />
            </div>
          );
        })}

        <div
          className="absolute"
          style={{
            top: `${(charRow / rows) * 100 + 1}%`,
            left: `${(charCol / cols) * 100 + 2}%`,
            width: `${100 / cols}%`,
            height: `${100 / rows}%`,
          }}
        >
          <img
            src={require(`../assets/images/${character}.png`)}
            alt={character}
            className="h-16"
          />
        </div>
      </div>
    </div>
  );
};

export default GameGrid;
