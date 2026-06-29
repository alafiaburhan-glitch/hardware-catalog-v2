  "use client";

  import { motion, useSpring, useTransform } from "framer-motion";
  import { useEffect } from "react";

  import "./Counter.css";

  function Number({ mv, number, height }) {
    let y = useTransform(mv, (latest) => {
      let placeValue = latest % 10;
      let offset = (10 + number - placeValue) % 10;
      let memo = offset * height;

      if (offset > 5) {
        memo -= 10 * height;
      }

      return memo;
    });

    return (
      <motion.span className="counter-number" style={{ y }}>
        {number}
      </motion.span>
    );
  }

  function Digit({ place, value, height, digitStyle }) {
    const valueRoundedToPlace = Math.floor(value / place);

    const animatedValue = useSpring(valueRoundedToPlace);

    useEffect(() => {
      animatedValue.set(valueRoundedToPlace);
    }, [animatedValue, valueRoundedToPlace]);

    return (
      <span className="counter-digit" style={{ height, ...digitStyle }}>
        {Array.from({ length: 10 }, (_, i) => (
          <Number key={i} mv={animatedValue} number={i} height={height} />
        ))}
      </span>
    );
  }

  export default function Counter({
    value,
    fontSize = 60,
    padding = 5,
    places = [100, 10, 1],
    gap = 8,
    textColor = "white",
    fontWeight = 700,
  }) {
    const height = fontSize + padding;

    return (
      <div className="counter-container">
        <div
          className="counter-counter"
          style={{
            fontSize,
            gap,
            color: textColor,
            fontWeight,
          }}
        >
          {places.map((place) => (
            <Digit
              key={place}
              place={place}
              value={value}
              height={height}
            />
          ))}
        </div>
      </div>
    );
  }