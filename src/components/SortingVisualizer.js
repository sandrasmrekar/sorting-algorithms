import React from "react";
import { getBubbelSortAnimations } from "../algorithms/BubbelSort";
import { COLORS, DIMENTIONS } from "../constants";
import { getHeapSortAnimations } from "../algorithms/HeapSort";
import { getMergeSortAnimations } from "../algorithms/MergeSort";
import Nav from "./Nav";
import { getQuickSortAnimations } from "../algorithms/QuickSort";
import "./SortingVisualizer.css";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      color: COLORS.PRIMARY_COLOR,
      run: false,
      barValue: null,
      animationSpeed: 10,
      barWidth: null,
      nbrOfBars: DIMENTIONS.WINDOW_WIDTH / 20,
    };
  }

  componentDidMount() {
    this.resetArray();
    const nbrOfBars =
      ((10 - 1) / (100 - 1)) * (DIMENTIONS.WINDOW_WIDTH / 20 - 4) + 4;
    const barWidth = 100 / (10 / 3) + 5;
    this.setState({ nbrOfBars, barWidth });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.nbrOfBars !== this.state.nbrOfBars) {
      this.resetArray();
    }
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.nbrOfBars; i++) {
      array.push(randomIntFromInterval(5, DIMENTIONS.WINDOW_HEIGHT - 200));
    }
    this.setState({ array });
    this.setState({ color: COLORS.PRIMARY_COLOR, done: false });
  }

  mergeSort() {
    this.setState({ run: true });
    const animations = getMergeSortAnimations(this.state.array.slice(0));
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2; // every third is 2
      const [value1] = animations[i];
      if (value1 === "done") {
        setTimeout(() => {
          this.setState({ run: false, color: COLORS.DONE_COLOR });
        }, i * this.state.animationSpeed);
      } else if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color =
          i % 3 === 0 ? COLORS.SECONDARY_COLOR : COLORS.PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.animationSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];

          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.state.animationSpeed);
      }
    }
  }

  quickSort() {
    this.setState({ run: true });
    const animations = getQuickSortAnimations(this.state.array.slice(0));
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const [value1, value2, count] = animations[i];
      if (value1 === "done") {
        setTimeout(() => {
          this.setState({ color: COLORS.DONE_COLOR });
          this.setState({ run: false });
        }, i * this.state.animationSpeed);
      } else if (value1 === "pivot") {
        setTimeout(() => {
          const color = count === 1 ? COLORS.PIVOT_COLOR : COLORS.PRIMARY_COLOR;
          const barPivotStyle = arrayBars[value2].style;
          barPivotStyle.backgroundColor = color;
        }, i * this.state.animationSpeed);
      } else {
        const [barOneId, height1, barTwoId, height2, count] = animations[i];
        const barOneStyle = arrayBars[barOneId].style;
        const barTwoStyle = arrayBars[barTwoId].style;

        setTimeout(() => {
          barOneStyle.backgroundColor =
            count === 1 ? COLORS.SECONDARY_COLOR : COLORS.PRIMARY_COLOR;
          barTwoStyle.backgroundColor =
            count === 1 ? COLORS.SECONDARY_COLOR : COLORS.PRIMARY_COLOR;
          if (count === 2) {
            barOneStyle.height = `${height2}px`;
            barTwoStyle.height = `${height1}px`;
          }
        }, i * this.state.animationSpeed);
      }
    }
  }

  heapSort() {
    this.setState({ run: true });
    const animations = getHeapSortAnimations(this.state.array.slice(0));
    for (let i = 0; i < animations.length; i++) {
      const [value1] = animations[i];
      const arrayBars = document.getElementsByClassName("array-bar");

      if (value1 === "done") {
        setTimeout(() => {
          this.setState({ color: COLORS.DONE_COLOR });
          this.setState({ run: false });
        }, i * this.state.animationSpeed);
      } else {
        const [barOneId, height1, barTwoId, height2, count] = animations[i];
        const barOneStyle = arrayBars[barOneId].style;
        const barTwoStyle = arrayBars[barTwoId].style;

        setTimeout(() => {
          barOneStyle.backgroundColor =
            count === 1 ? COLORS.SECONDARY_COLOR : COLORS.PRIMARY_COLOR;
          barTwoStyle.backgroundColor =
            count === 1 ? COLORS.SECONDARY_COLOR : COLORS.PRIMARY_COLOR;
          if (count === 2) {
            barOneStyle.height = `${height2}px`;
            barTwoStyle.height = `${height1}px`;
          }
        }, i * this.state.animationSpeed);
      }
    }
  }

  bubbleSort() {
    this.setState({ run: true });
    const animations = getBubbelSortAnimations(this.state.array.slice(0));
    for (let i = 0; i < animations.length; i++) {
      const [value1] = animations[i];
      const arrayBars = document.getElementsByClassName("array-bar");

      if (value1 === "done") {
        setTimeout(() => {
          this.setState({ color: COLORS.DONE_COLOR });
          this.setState({ run: false });
        }, i * this.state.animationSpeed);
      } else {
        const [barOneId, height1, barTwoId, height2, count] = animations[i];
        const barOneStyle = arrayBars[barOneId].style;
        const barTwoStyle = arrayBars[barTwoId].style;

        setTimeout(() => {
          barOneStyle.backgroundColor =
            count === 1 ? COLORS.SECONDARY_COLOR : COLORS.PRIMARY_COLOR;
          barTwoStyle.backgroundColor =
            count === 1 ? COLORS.SECONDARY_COLOR : COLORS.PRIMARY_COLOR;
          if (count === 2) {
            barOneStyle.height = `${height2}px`;
            barTwoStyle.height = `${height1}px`;
          }
        }, i * this.state.animationSpeed);
      }
    }
  }

  showValue(value) {
    this.setState({
      barValue:
        // hovering on div parent           hovering on child element
        value.target.style.height || value.target.children[0].style.height,
    });
  }

  hideValue() {
    this.setState({ barValue: null });
  }

  handleSlider(value) {
    // Transforming animations speed. (Trial and error)
    var animationSpeed = 120 - value;
    animationSpeed =
      value > 50 ? animationSpeed - (value * 2) / 10 : animationSpeed;

    // Transforming value into other number range from min = 4    max = WINDOW_WIDTH / 20
    const nbrOfBars =
      ((value - 1) / (100 - 1)) * (DIMENTIONS.WINDOW_WIDTH / 20 - 4) + 4;

    // Changing barwidth depending on curent value
    const barWidth = 100 / (value / 3) + 5; // should 60 / (value / 2) + 5;

    this.setState({ nbrOfBars, barWidth, animationSpeed });
  }

  render() {
    const { array, barWidth } = this.state;
    return (
      <div>
        <Nav
          onReset={() => this.resetArray()}
          onQuickSort={() => this.quickSort()}
          onMergeSort={() => {
            this.mergeSort();
          }}
          onHeapSort={() => this.heapSort()}
          onBubbelSort={() => this.bubbleSort()}
          isRunning={this.state.run}
          barValue={this.state.barValue}
          onValueChange={(value) => this.handleSlider(value)}
        />
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar-box"
              onMouseEnter={(e) => this.showValue(e)}
              onMouseLeave={() => this.hideValue()}
              key={idx}
            >
              <div
                className="array-bar"
                style={{
                  backgroundColor: this.state.color,
                  height: `${value}px`,
                  width: `${barWidth}px`,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
