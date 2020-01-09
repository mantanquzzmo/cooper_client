import React, { Component } from "react";
import DisplayCooperResult from "./components/DisplayCooperResult";
import InputFields from "./components/InputFields";
import LoginForm from "./components/LoginForm";
import { authenticate } from "./modules/auth";
import DisplayPerformanceData from "./components/DisplayPerformanceData";
import DisplayChart from "./components/DisplayChart";

class App extends Component {
  state = {
    distance: "",
    gender: "female",
    age: "",
    renderLoginForm: false,
    authenticated: false,
    message: "",
    entrySaved: false,
    renderIndex: false,
    renderGraph: false
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value, entrySaved: false });
  };

  onLogin = async e => {
    e.preventDefault();
    const response = await authenticate(
      e.target.email.value,
      e.target.password.value
    );
    if (response.authenticated) {
      this.setState({ authenticated: true });
    } else {
      this.setState({ message: response.message, renderLoginForm: false });
    }
  };

  render() {
    const { renderLoginForm, authenticated, message } = this.state;
    let renderLogin;
    let performanceDataIndex;
    let performanceDataGraph;
    switch (true) {
      case renderLoginForm && !authenticated:
        renderLogin = <LoginForm submitFormHandler={this.onLogin} />;
        break;
      case !renderLoginForm && !authenticated:
        renderLogin = (
          <>
            <button
              id="login"
              onClick={() => this.setState({ renderLoginForm: true })}
            >
              Login
            </button>
            <p>{message}</p>
          </>
        );
        break;
      case authenticated:
        renderLogin = (
          <p>Hi {JSON.parse(sessionStorage.getItem("credentials")).uid}</p>
        );
        if (this.state.renderIndex) {
          performanceDataIndex = (
            <>
              <DisplayPerformanceData
                updateIndex={this.state.updateIndex}
                indexUpdated={() => this.setState({ updateIndex: false })}
              />
              <button onClick={() => this.setState({ renderIndex: false })}>
                Hide past entries
              </button>
            </>
          );
        } else {
          performanceDataIndex = (
            <button
              id="show-index"
              onClick={() => this.setState({ renderIndex: true })}
            >
              Show past entries
            </button>
          );
        }
        if (this.state.renderGraph) {
          performanceDataGraph = (
            <>
              <button onClick={() => this.setState({ renderGraph: false })}>
                Hide Graph
              </button>
              <DisplayChart
                updateIndex={this.state.updateIndex}
                indexUpdated={() => this.setState({ updateIndex: false })}
              />
            </>
          );
        } else {
          performanceDataGraph = (
            <button
              id="show-graph"
              onClick={() => this.setState({ renderGraph: true })}
            >
              Show Graph
            </button>
          );
        }
    }
    return (
      <>
        <InputFields onChangeHandler={this.onChangeHandler} />
        {renderLogin}
        <DisplayCooperResult
          distance={this.state.distance}
          gender={this.state.gender}
          age={this.state.age}
          authenticated={this.state.authenticated}
          entrySaved={this.state.entrySaved}
          entryHandler={() =>
            this.setState({ entrySaved: true, updateIndex: true })
          }
        />
        {performanceDataIndex}
        {performanceDataGraph}
      </>
    );
  }
}

export default App;
