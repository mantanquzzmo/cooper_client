import React, { Component } from "react";
import DisplayCooperResult from "./components/DisplayCooperResult";
import InputFields from "./components/InputFields";
import LoginForm from "./components/LoginForm";
import { authenticate } from "./modules/auth";
import DisplayPerformanceData from "./components/DisplayPerformanceData";
import DisplayChart from "./components/DisplayChart";
import { signup, signout } from "./modules/auth";

class App extends Component {
  state = {
    distance: "",
    gender: "female",
    age: "",
    renderLoginForm: true,
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

  onSignup = async e => {
    e.preventDefault();
    const response = await signup(
      e.target.email.value,
      e.target.password.value
    );
    if (response.authenticated) {
      this.setState({ authenticated: true });
    } else {
      this.setState({ message: response.message, renderLoginForm: false });
    }
  };

  onLogout = async () => {
    const response = await signout();
    if (!response.authenticated) {
      this.setState({ authenticated: false, age: "", distance: "" });
      sessionStorage.removeItem("credentials");
    } else {
      this.setState({ message: response.message });
    }
  };

  render() {
    const { renderLoginForm, authenticated, message } = this.state;
    let renderLogin;
    let renderLogout;
    let renderFields;
    let performanceDataIndex;
    let performanceDataGraph;
    switch (true) {
      case renderLoginForm && !authenticated:
        renderLogin = (
          <LoginForm
            submitFormHandler={this.onLogin}
            submitSignupHandler={this.onSignup}
          />
        );
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
        renderFields = (
          <>
            <InputFields onChangeHandler={this.onChangeHandler} />
          </>
        );
        renderLogout = (
          <>
            <button
              onClick={() => {
                this.onLogout();
              }}
            >
              Sign out
            </button>
          </>
        );
        renderLogin = (
          <>
            <div class="welcome">
              <h1>
                Welcome {JSON.parse(sessionStorage.getItem("credentials")).uid}
              </h1>
              <button
                class="logout-btn"
                onClick={() => {
                  this.onLogout();
                }}
              >
                Sign out
              </button>
            </div>
          </>
        );
        if (this.state.renderIndex) {
          performanceDataIndex = (
            <>
              <button
                class="ui teal basic button"
                onClick={() => this.setState({ renderIndex: false })}
              >
                Hide Results
              </button>
              <DisplayPerformanceData
                updateIndex={this.state.updateIndex}
                indexUpdated={() => this.setState({ updateIndex: false })}
              />
            </>
          );
        } else {
          performanceDataIndex = (
            <button
              id="show-index"
              class="ui teal button"
              onClick={() => this.setState({ renderIndex: true })}
            >
              Show Results
            </button>
          );
        }
        if (this.state.renderGraph) {
          performanceDataGraph = (
            <>
              <button
                class="ui purple basic button"
                onClick={() => this.setState({ renderGraph: false })}
              >
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
              class="ui purple button"
              onClick={() => this.setState({ renderGraph: true })}
            >
              Show Graph
            </button>
          );
        }
    }
    return (
      <>
        {renderLogin}
        {renderFields}
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
