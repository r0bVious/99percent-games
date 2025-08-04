import { Segment } from "../App";

interface GameWheelProps {
  wheelData: Segment[];
}

const RADIUS = 150;
const SIZE = RADIUS * 2;

const getColors = (multiplier: number): string => {
  switch (multiplier) {
    case 0:
      return "#ef4444";
    case 1:
      return "#60a5fa";
    case 2:
      return "#22CC22";
    case 3:
      return "#f59e0b";
    default:
      return "#d1d5db";
  }
};

const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
};

const describeArc = (
  cx: number,
  cy: number,
  r: number,
  start: number,
  end: number
) => {
  const startPt = polarToCartesian(cx, cy, r, end);
  const endPt = polarToCartesian(cx, cy, r, start);
  const largeArc = end - start > 180 ? 1 : 0;

  return [
    `M ${cx} ${cy}`,
    `L ${startPt.x} ${startPt.y}`,
    `A ${r} ${r} 0 ${largeArc} 0 ${endPt.x} ${endPt.y}`,
    "Z",
  ].join(" ");
};

const GameWheel: React.FC<GameWheelProps> = ({ wheelData }) => {
  const anglePerSlice = 360 / wheelData.length;

  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="overflow-visible"
    >
      {wheelData.map((segment, i) => {
        const startAngle = i * anglePerSlice;
        const endAngle = startAngle + anglePerSlice;
        const labelAngle = (startAngle + endAngle) / 2;

        const path = describeArc(RADIUS, RADIUS, RADIUS, startAngle, endAngle);
        const labelPos = polarToCartesian(
          RADIUS,
          RADIUS,
          RADIUS * 0.9,
          labelAngle
        );

        return (
          <g key={i}>
            <path
              d={path}
              fill={getColors(segment.multiplier)}
              stroke="#fff"
              strokeWidth={1}
            />
            <text
              x={labelPos.x}
              y={labelPos.y}
              fill="#fff"
              fontSize="14"
              fontWeight="bold"
              textAnchor="middle"
              alignmentBaseline="middle"
              transform={`rotate(${labelAngle} ${labelPos.x} ${labelPos.y})`}
            >
              {segment.label}
            </text>
          </g>
        );
      })}
      <circle cx={RADIUS} cy={RADIUS} r={100} stroke="#FFF" strokeWidth={1} />;
    </svg>
  );
};

export default GameWheel;
