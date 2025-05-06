import React, { useState } from "react";
import ColorPicker from "./ColorPicker";
import PrizeList from "./PrizeList";
import PrizeWheel from "./PrizeWheel";
import WheelControls from "./WheelControls";

export default function AdminPanel({
  initialPrizes = [],
  initialFontColor = "#ffffff",
  onSave = null,
  colorPickerComponent = null,
  wheelConfig = {},
}) {
  const [prizes, setPrizes] = useState(initialPrizes);
  const [fontColor, setFontColor] = useState(initialFontColor);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleSave = () => {
    if (onSave) {
      onSave({ prizes, fontColor });
    }
  };

  const handleSpin = () => {
    setIsSpinning(true);
    setResult(null);
  };

  const handleSpinFinished = (prize) => {
    setIsSpinning(false);
    setResult(prize);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-700">
          🎛️ Prize Wheel Configuration
        </h2>
        <p className="text-gray-500 text-sm">
          Set prizes, colors, and preview the wheel
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Panel: Settings */}
        <div className="flex-1 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Font Color
            </label>
            <div className="flex items-center gap-4">
              <ColorPicker
                color={fontColor}
                onChange={setFontColor}
                pickerComponent={colorPickerComponent}
              />
              <span
                className="px-3 py-1 rounded text-sm"
                style={{ backgroundColor: fontColor, color: "#fff" }}
              >
                Aa Preview
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              🎁 Prize List
            </h3>
            <PrizeList
              prizes={prizes}
              onChange={setPrizes}
              colorPickerComponent={colorPickerComponent}
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              💾 Save Settings
            </button>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              {showPreview ? "🙈 Hide Preview" : "👀 Show Preview"}
            </button>
          </div>
        </div>

        {/* Right Panel: Preview */}
        {showPreview && (
          <div className="flex-1 flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              🎡 Wheel Preview
            </h3>
            <div className="w-full max-w-sm">
              <PrizeWheel
                prizes={prizes}
                fontColor={fontColor}
                onFinished={handleSpinFinished}
                wheelConfig={wheelConfig}
              />
              <div className="mt-4 text-center">
                <WheelControls
                  onSpin={handleSpin}
                  isSpinning={isSpinning}
                  result={result}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
