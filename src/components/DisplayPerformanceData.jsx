import React, { Component } from "react";
import { getData } from "../modules/performanceData";

class DisplayPerformanceData extends Component {
  state = {
    performanceData: null
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
    this.setState({ performanceData: result.data.entries }, () => {
      this.props.indexUpdated();
    });
  }

  render() {
    let dataIndex;

    if (this.state.performanceData != null) {
      dataIndex = (
        <div>
          {this.state.performanceData.map(item => {
            return (
              <div class="run" key={item.id}>
                <p>Run no: {item.id}</p>
                <p>Result: {item.data.message}</p>
                <p>Distance: {item.data.distance}</p>
                <p>Your age: {item.data.age}</p>
              </div>
            );
          })}
        </div>
      );
    }

    return <div id="index">{dataIndex}</div>;
  }
}

export default DisplayPerformanceData;
