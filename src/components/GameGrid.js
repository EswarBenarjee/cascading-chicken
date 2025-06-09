import Grass from "../assets/images/grass.png";
import Water from "../assets/images/water.png";

const GameGrid = () => {
  const rows = 10;
  const cols = 9;

  return (
    <div className="h-screen w-full overflow-hidden">
      <div
        className="grid w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {[...Array(rows * cols)].map((_, i) => (
          <div key={i} className="w-full h-full">
            <img
              src={Grass}
              alt="Grass"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameGrid;
