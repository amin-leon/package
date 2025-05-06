import React, { useState } from "react";
import { PrizeWheel, AdminPanel, WheelControls } from "react-prize-wheel";
import { SketchPicker } from "react-color"; // You would need to install react-color

function App() {
  const [wheelConfig, setWheelConfig] = useState({
    prizes: [
      { option: "10% OFF", color: "#ff8f43" },
      { option: "Free Shipping", color: "#70bbe0" },
      { option: "$5 Gift Card", color: "#0b3351" },
      { option: "Try Again", color: "#f9dd50" },
    ],
    fontColor: "#ffffff",
  });

  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const handleSaveConfig = (config) => {
    setWheelConfig(config);
    console.log("Saved configuration:", config);
  };

  const handleSpin = () => {
    setIsSpinning(true);
    setResult(null);
  };

  const handleSpinFinished = (prize) => {
    setIsSpinning(false);
    setResult(prize);
  };

  // Example usage with tabs for different views
  const [activeTab, setActiveTab] = useState("play"); // 'play' or 'admin'

  return (
    <div className="app">
      <header>
        <h1>Prize Wheel Demo</h1>
        <div className="tabs">
          <button
            className={activeTab === "play" ? "active" : ""}
            onClick={() => setActiveTab("play")}
          >
            Play
          </button>
          <button
            className={activeTab === "admin" ? "active" : ""}
            onClick={() => setActiveTab("admin")}
          >
            Admin
          </button>
        </div>
      </header>

      <main>
        {activeTab === "play" ? (
          <div className="play-mode">
            <div className="wheel-container">
              <PrizeWheel
                prizes={wheelConfig.prizes}
                fontColor={wheelConfig.fontColor}
                onFinished={handleSpinFinished}
                wheelConfig={{
                  spinDuration: 1.0,
                  outerBorderWidth: 5,
                  outerBorderColor: "#333333",
                  innerRadius: 20,
                  innerBorderColor: "#333333",
                  innerBorderWidth: 3,
                  radiusLineWidth: 2,
                  pointerProps: {
                    backgroundColor: "#333333",
                    borderColor: "#FFFFFF",
                  },
                }}
              />
              <div className="controls-container">
                <WheelControls
                  onSpin={handleSpin}
                  isSpinning={isSpinning}
                  result={result}
                  buttonStyle={{
                    backgroundColor: "#ff8f43",
                    fontSize: "18px",
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="admin-mode">
            <AdminPanel
              initialPrizes={wheelConfig.prizes}
              initialFontColor={wheelConfig.fontColor}
              onSave={handleSaveConfig}
              colorPickerComponent={SketchPicker}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
