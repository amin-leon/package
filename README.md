# React Prize Wheel

A customizable prize wheel/spinner component for React applications.

![React Prize Wheel Demo](https://via.placeholder.com/800x400/f8f9fa/212529?text=React+Prize+Wheel)

## Features

- 🎡 Fully customizable prize wheel with animation
- 🎨 Color customization for each prize segment
- 🛠️ Admin panel for easy configuration
- 📱 Responsive design
- 🔄 Simple integration with existing React applications

## Installation

```bash
npm install react-prize-wheel
# or
yarn add react-prize-wheel
```

## Basic Usage

```jsx
import React, { useState } from 'react';
import { PrizeWheel, WheelControls } from 'react-prize-wheel';

function SimplePrizeWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  
  const prizes = [
    { option: '10% OFF', color: '#ff8f43' },
    { option: 'Free Shipping', color: '#70bbe0' },
    { option: '$5 Gift Card', color: '#0b3351' },
    { option: 'Try Again', color: '#f9dd50' }
  ];
  
  const handleSpin = () => {
    setIsSpinning(true);
    setResult(null);
  };
  
  const handleSpinFinished = (prize) => {
    setIsSpinning(false);
    setResult(prize);
  };

  return (
    <div>
      <PrizeWheel 
        prizes={prizes}
        fontColor="#ffffff"
        onFinished={handleSpinFinished}
      />
      
      <WheelControls 
        onSpin={handleSpin}
        isSpinning={isSpinning}
        result={result}
      />
    </div>
  );
}
```
