interface ClockHandsProps {
  hourDeg: number;
  minuteDeg: number;
  secondDeg: number;
}

const ClockHands = ({
  hourDeg,
  minuteDeg,
  secondDeg,
}: ClockHandsProps) => {
  return (
    <>
      <line
        x1="150"
        y1="150"
        x2="150"
        y2="95"
        stroke="black"
        strokeWidth="4"
        transform={`rotate(${hourDeg} 150 150)`}
      />
      <line
        x1="150"
        y1="150"
        x2="150"
        y2="75"
        stroke="black"
        strokeWidth="2"
        transform={`rotate(${minuteDeg} 150 150)`}
      />
      <line
        x1="150"
        y1="150"
        x2="150"
        y2="65"
        stroke="red"
        strokeWidth="1.5"
        transform={`rotate(${secondDeg} 150 150)`}
      />
      <circle cx="150" cy="150" r="4" fill="black" />
    </>
  );
};

export default ClockHands;

