import React, { useState } from "react";

/**
 * A simple and flexible color picker component
 *
 * @param {Object} props
 * @param {string} props.color - The current color value (hex)
 * @param {Function} props.onChange - Callback when color changes
 * @param {Object} props.pickerComponent - Optional custom color picker component
 * @param {Object} props.style - Additional styles for the color swatch
 * @returns {JSX.Element}
 */
export default function ColorPicker({
  color,
  onChange,
  pickerComponent: PickerComponent = null,
  style = {},
}) {
  const [showPicker, setShowPicker] = useState(false);

  const handleClose = (e) => {
    if (e.target !== e.currentTarget) return;
    setShowPicker(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => setShowPicker(!showPicker)}
        style={{
          backgroundColor: color,
          width: 30,
          height: 30,
          cursor: "pointer",
          border: "1px solid #ccc",
          borderRadius: "3px",
          ...style,
        }}
        aria-label="Select color"
        role="button"
        tabIndex={0}
      />

      {showPicker && (
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            background: "rgba(0,0,0,0.3)",
            padding: "10px",
            borderRadius: "4px",
          }}
          onClick={handleClose}
        >
          {PickerComponent ? (
            <PickerComponent
              color={color}
              onChange={(c) => {
                // Handle various color picker return formats
                const newColor = typeof c === "string" ? c : c.hex || c;
                onChange(newColor);
              }}
            />
          ) : (
            <input
              type="color"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              style={{ width: "100px", height: "30px" }}
            />
          )}
        </div>
      )}
    </div>
  );
}
