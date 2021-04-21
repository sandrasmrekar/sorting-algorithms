import React, { useState } from "react";
import { Slider, Typography } from "@material-ui/core";
// or
export default function Nav({
  onQuickSort,
  onMergeSort,
  onReset,
  isRunning,
  onHeapSort,
  onBubbelSort,
  onValueChange,
  barValue,
}) {
  const [value, setValue] = useState(10);
  const handleChange = (sliderValue) => {
    setValue(sliderValue);
    onValueChange(sliderValue);
  };
  return (
    <header>
      <div className="row">
        <button onClick={onMergeSort} disabled={isRunning}>
          Merge Sort
        </button>
        <button onClick={onQuickSort} disabled={isRunning}>
          Quicke Sort
        </button>
        <button onClick={onHeapSort} disabled={isRunning}>
          Heap Sort
        </button>
        <button onClick={onBubbelSort} disabled={isRunning}>
          Bubble Sort
        </button>
        <button onClick={onReset} disabled={isRunning}>
          New Array
        </button>
        <h1>{barValue}</h1>
      </div>
      <Typography id="discrete-slider-small-steps" gutterBottom>
        Change Animations speed and numbers of bars
      </Typography>
      <Slider
        onChange={(e, value) => handleChange(value)}
        style={{ width: "10%" }}
        disabled={isRunning}
        value={value}
        max={100}
        step={2}
        min={1}
      />
      <div className="line" />
    </header>
  );
}
