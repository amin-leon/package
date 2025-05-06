import React, { useState, useEffect, useCallback } from "react";
import { Wheel } from "react-custom-roulette";

/**
 * A customizable prize wheel component
 *
 * @param {Object} props
 * @param {Array} props.prizes - Array of prize objects with option and color properties
 * @param {string} props.fontColor - Text color for the prizes
 * @param {Function} props.onFinished - Callback when spinning is complete
 * @param {Object} props.wheelConfig - Additional configuration for the wheel
 * @returns {JSX.Element}
 */
export default function PrizeWheel({
  prizes = [],
  fontColor = "#ffffff",
  onFinished = () => {},
  wheelConfig = {},
}) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [result, setResult] = useState(null);

  // Handle config defaults
  const config = {
    spinDuration: 1.0,
    backgroundColors: [],
    textDistance: 60,
    fontSize: 16,
    ...wheelConfig,
  };

  const handleSpinClick = useCallback(() => {
    if (prizes.length === 0) return;

    const index = Math.floor(Math.random() * prizes.length);
    setPrizeNumber(index);
    setMustSpin(true);
    setResult(null);
  }, [prizes]);

  const handleStopSpinning = useCallback(() => {
    setMustSpin(false);
    const winningPrize = prizes[prizeNumber];
    setResult(winningPrize);

    if (onFinished) {
      onFinished(winningPrize, prizeNumber);
    }
  }, [prizes, prizeNumber, onFinished]);

  // Prepare data for the wheel
  const wheelData = prizes.map((prize) => ({
    option: prize.option,
    style: {
      backgroundColor: prize.color,
      textColor: fontColor || "#ffffff",
    },
  }));

  // Don't render if no prizes
  if (prizes.length === 0) {
    return <div>Add prizes to display the wheel</div>;
  }

  return (
    <div className="prize-wheel-container">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={wheelData}
        onStopSpinning={handleStopSpinning}
        spinDuration={config.spinDuration}
        backgroundColors={config.backgroundColors}
        textDistance={config.textDistance}
        fontSize={config.fontSize}
        radiusLineWidth={config.radiusLineWidth || 1}
        pointerProps={config.pointerProps}
        innerRadius={config.innerRadius}
        innerBorderColor={config.innerBorderColor}
        innerBorderWidth={config.innerBorderWidth}
        outerBorderColor={config.outerBorderColor}
        outerBorderWidth={config.outerBorderWidth}
      />

      {result && !mustSpin && (
        <div className="prize-wheel-result">
          <p>You won: {result.option}</p>
        </div>
      )}
    </div>
  );
}
