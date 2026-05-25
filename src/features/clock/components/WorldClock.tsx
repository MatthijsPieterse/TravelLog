import { useEffect, useState, useMemo } from "react";
import ClockHands from "#features/clock/components/ClockHands";
import { cities } from "#features/clock/data/cities";
import { describeArc } from "#features/clock/utils/svgHelpers";
import { getTimeInTZ, getUTCOffset } from "#features/clock/utils/timeUtils";

const WorldClock = () => {
  const [time, setTime] = useState(new Date());
  const localTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const {
    hour: hours,
    minute: minutes,
    second: seconds,
  } = getTimeInTZ(time, localTZ);
  const hourDeg = hours * 30 + minutes * 0.5;
  const minuteDeg = minutes * 6;
  const secondDeg = seconds * 6;

  const localOffset = getUTCOffset(localTZ, time);
  const localCity = useMemo(() => {
    let closestCity = cities[0];
    let minDiff = Infinity;
    for (const city of cities) {
      const diff = Math.abs(getUTCOffset(city.tz, time) - localOffset);
      if (diff < 0.1 && diff < minDiff) {
        closestCity = city;
        minDiff = diff;
      }
    }
    return closestCity;
  }, [localOffset, time]);

  const localIndex = cities.indexOf(localCity);
  const cityRotation = -(localIndex / cities.length) * 360;
  const topCityHour24 =
    (time.getUTCHours() + getUTCOffset(localCity.tz, time) + 24) % 24;

  return (
    <div className="flex items-center justify-center">
      <svg viewBox="0 0 300 300" className="w-[200px] h-[200px]">
        <path
          d={describeArc(150, 150, 105, 90 + 6.5 * 15, 90 + 18.5 * 15)}
          fill="rgba(255, 223, 186, 0.3)"
        />

        {/* City Ring */}
        <g transform={`rotate(${cityRotation} 150 150)`}>
          {cities.map((city, i) => {
            const angle = (i / cities.length) * 360;
            const radius = 135;
            const x = 150 + radius * Math.cos(((angle - 90) * Math.PI) / 180);
            const y = 150 + radius * Math.sin(((angle - 90) * Math.PI) / 180);
            return (
              <text
                key={city.name}
                x={x}
                y={y}
                fontSize="9"
                fill={city === localCity ? "#f7abab" : "#ecfdf5"}
                textAnchor="middle"
                transform={`rotate(${angle} ${x} ${y})`}
              >
                {city.name}
              </text>
            );
          })}
        </g>

        {/* 24 Hour Ring */}
        <g>
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * 360;
            const radius = 105;
            const x = 150 + radius * Math.cos(((angle - 135) * Math.PI) / 180);
            const y = 150 + radius * Math.sin(((angle - 135) * Math.PI) / 180);
            return (
              <text key={i} x={x} y={y} textAnchor="middle" fontSize="9">
                {(i + Math.floor(topCityHour24)) % 24}
              </text>
            );
          })}
        </g>

        {/* Inner Hour Tick Marks */}
        <g>
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * 360;
            const x1 = 150 + 60 * Math.cos(((angle - 90) * Math.PI) / 180);
            const y1 = 150 + 60 * Math.sin(((angle - 90) * Math.PI) / 180);
            const x2 = 150 + 70 * Math.cos(((angle - 90) * Math.PI) / 180);
            const y2 = 150 + 70 * Math.sin(((angle - 90) * Math.PI) / 180);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="black"
                strokeWidth="2"
              />
            );
          })}
        </g>

        <ClockHands
          hourDeg={hourDeg}
          minuteDeg={minuteDeg}
          secondDeg={secondDeg}
        />
      </svg>
    </div>
  );
};

export default WorldClock;
