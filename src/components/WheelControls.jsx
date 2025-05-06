import React from "react";

/**
 * Controls for the prize wheel
 *
 * @param {Object} props
 * @param {Function} props.onSpin - Callback when spin button is clicked
 * @param {boolean} props.isSpinning - Whether the wheel is currently spinning
 * @param {Object} props.buttonStyle - Custom styles for the spin button
 * @param {Object} props.result - Current result object if available
 * @returns {JSX.Element}
 */
export default function WheelControls({
  onSpin,
  isSpinning = false,
  buttonStyle = {},
  result = null,
}) {
  return (
    <div className="wheel-controls">
      <button
        onClick={onSpin}
        disabled={isSpinning}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "5px",
          backgroundColor: isSpinning ? "#ccc" : "#4CAF50",
          color: "#fff",
          border: "none",
          cursor: isSpinning ? "not-allowed" : "pointer",
          transition: "background-color 0.3s",
          ...buttonStyle,
        }}
      >
        {isSpinning ? "Spinning..." : "Spin"}
      </button>

      {result && !isSpinning && (
        <div
          className="wheel-result"
          style={{
            marginTop: "15px",
            padding: "10px",
            border: `2px solid ${result.color || "#ccc"}`,
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold" }}>
            You won: {result.option}
          </p>
        </div>
      )}
    </div>
  );
}
