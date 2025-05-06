import React, { useState } from "react";
import ColorPicker from "./ColorPicker";
import { defaultColors } from "../utils/defaultColors";

/**
 * Component for managing prize list
 *
 * @param {Object} props
 * @param {Array} props.prizes - Array of prize objects
 * @param {Function} props.onChange - Callback when prizes change
 * @param {Object} props.colorPickerComponent - Optional custom color picker component
 * @returns {JSX.Element}
 */
export default function PrizeList({
  prizes = [],
  onChange,
  colorPickerComponent = null,
}) {
  const [newPrize, setNewPrize] = useState("");

  const handleAddPrize = () => {
    if (newPrize.trim()) {
      const color = defaultColors[prizes.length % defaultColors.length];
      onChange([...prizes, { option: newPrize.trim(), color }]);
      setNewPrize("");
    }
  };

  const handleColorChange = (index, color) => {
    const updated = [...prizes];
    updated[index].color = color;
    onChange(updated);
  };

  const handleTextChange = (index, text) => {
    const updated = [...prizes];
    updated[index].option = text;
    onChange(updated);
  };

  const handleRemove = (index) => {
    const updated = prizes.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddPrize();
    }
  };

  return (
    <div className="prize-list">
      <div
        className="prize-add-form"
        style={{
          display: "flex",
          marginBottom: "15px",
        }}
      >
        <input
          type="text"
          placeholder="Enter prize"
          value={newPrize}
          onChange={(e) => setNewPrize(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          onClick={handleAddPrize}
          style={{
            padding: "8px 15px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {prizes.map((prize, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <input
              type="text"
              value={prize.option}
              onChange={(e) => handleTextChange(index, e.target.value)}
              style={{
                flex: 1,
                padding: "6px",
                marginRight: "10px",
                border: "1px solid #ddd",
                borderRadius: "3px",
              }}
            />
            <ColorPicker
              color={prize.color}
              onChange={(c) => handleColorChange(index, c)}
              pickerComponent={colorPickerComponent}
              style={{ marginRight: "10px" }}
            />
            <button
              onClick={() => handleRemove(index)}
              style={{
                padding: "3px 8px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
