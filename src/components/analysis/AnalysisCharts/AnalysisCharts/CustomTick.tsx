import React from "react";

export const CustomTick = (props: any) => {
  const { x, y, payload } = props;
  let emoji = "";
  switch (payload.value) {
    case 0:
      emoji = "🦥";
      break;
    case 25:
      emoji = "🐔";
      break;
    case 50:
      emoji = "🐎";
      break;
    case 75:
      emoji = "🦅";
      break;
    case 100:
      emoji = "🤖";
      break;
    default:
      emoji = "";
  }

  // Adjust the `dy` value to shift the text up or down
  // A negative value will shift the text upwards
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={2} textAnchor="end" fill="#666">
        {`${payload.value} ${emoji}`}
      </text>
    </g>
  );
};
