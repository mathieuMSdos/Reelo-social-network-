interface GridLinesBackgroundProps {
  lineColor?: string;
  backgroundColor?: string;
  gridSize?: number;
  lineThickness?: number;
  fadeTop?: boolean;
  fadeBottom?: boolean;
  fadeRadius?: boolean;
  topFadeHeight?: number;
  bottomFadeHeight?: number;
  opacity?: number;
}

const GridLinesBackground = ({
  lineColor = "#f0f0f0",
  backgroundColor = "#FAFAFA",
  gridSize = 60,
  lineThickness = 1,
  fadeTop = true,
  fadeBottom = true,
  fadeRadius = true,
  topFadeHeight = 100,
  bottomFadeHeight = 200,
  opacity = 1,
}: GridLinesBackgroundProps) => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className="relative w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 0%, transparent ${
              25 - lineThickness / 2
            }%, ${lineColor} ${25 - lineThickness / 2}%, ${lineColor} ${
            25 + lineThickness / 2
          }%, transparent ${25 + lineThickness / 2}%, transparent 100%),
            linear-gradient(-45deg, transparent 0%, transparent ${
              25 - lineThickness / 2
            }%, ${lineColor} ${25 - lineThickness / 2}%, ${lineColor} ${
            25 + lineThickness / 2
          }%, transparent ${25 + lineThickness / 2}%, transparent 100%)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          backgroundPosition: "center center",
          opacity: opacity,
        }}
      >
        {fadeTop && (
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              height: `${topFadeHeight}px`,
              background: `linear-gradient(to bottom, ${backgroundColor} 0%, transparent 100%)`,
            }}
          />
        )}

        {fadeRadius && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, transparent 0%, transparent 25%, ${backgroundColor} 100%)`,
            }}
          />
        )}

        {fadeBottom && (
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: `${bottomFadeHeight}px`,
              background: `linear-gradient(to top, ${backgroundColor} 0%, transparent 100%)`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default GridLinesBackground;
