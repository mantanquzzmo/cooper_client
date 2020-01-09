import React, { Component } from "react";
import CanvasJSReact from "../assets/canvasjs.react.js";
import { getData } from "../modules/performanceData";

class DisplayChart extends Component {
  state = {
    performanceData: null,
    numberOfPoor: null,
    numberOfBAvg: null,
    numberOfAvg: null,
    numberOfAAvg: null,
    numberOfExc: null
  };

  componentDidMount() {
    this.getPerformanceData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.updateIndex !== prevProps.updateIndex) {
      this.getPerformanceData();
    }
  }

  async getPerformanceData() {
    let result = await getData();
    let resultArray = result.data.entries.map(item => 
      item.data.message)
    let numberOfPoor = resultArray.filter(x => x === 'Poor').length
    let numberOfBAvg = resultArray.filter(x => x === 'Below average').length
    let numberOfAvg = resultArray.filter(x => x === 'Average').length
    let numberOfAAvg = resultArray.filter(x => x === 'Above average').length
    let numberOfExc = resultArray.filter(x => x === 'Excellent').length
    
    this.setState({
      performanceData: result.data.entries,
      numberOfPoor: numberOfPoor,
      numberOfBAvg: numberOfBAvg,
      numberOfAvg: numberOfAvg,
      numberOfAAvg: numberOfAAvg,
      numberOfExc: numberOfExc
    });
  }

  render() {
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const options = {
      title: {
        text: "Results Shown By Graph"
      },
      data: [
        {
          type: "column",
          dataPoints: [
            { label: "Poor", y: this.state.numberOfPoor },
            { label: "Below Average", y: this.state.numberOfBAvg },
            { label: "Average", y: this.state.numberOfAvg },
            { label: "Below Average", y: this.state.numberOfAAvg },
            { label: "Excellent", y: this.state.numberOfExc }
          ]
        }
      ]
    };

    return (
      <div id="chart">
        <CanvasJSChart options={options} />
      </div>
    );
  }
}

export default DisplayChart;