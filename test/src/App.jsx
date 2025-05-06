import { useState } from "react";
import { PrizeWheel as CustomRouletteWheel, AdminPanel } from "wheel-package";

function App() {
  const [prizes, setPrizes] = useState([
    { option: "10% OFF", color: "#ff8f43" },
    { option: "Free Shipping", color: "#70bbe0" },
    { option: "$5 Gift Card", color: "#0b3351" },
    { option: "Try Again", color: "#f9dd50" },
  ]);
  const [fontColor, setFontColor] = useState("#ffffff");

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-10 text-gray-900">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800">
            🎯 Wheel Prize Game
          </h1>
          <p className="text-gray-600 mt-2">
            Customize your wheel and spin to win!
          </p>
        </header>

        <section className="bg-white shadow-md rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            🛠️ Admin Panel
          </h2>
          <AdminPanel
            prizes={prizes}
            setPrizes={setPrizes}
            fontColor={fontColor}
            setFontColor={setFontColor}
          />
        </section>

        <section className="bg-white shadow-md rounded-2xl p-6 md:p-8 flex justify-center">
          <CustomRouletteWheel prizes={prizes} fontColor={fontColor} />
        </section>
      </div>
    </main>
  );
}

export default App;
