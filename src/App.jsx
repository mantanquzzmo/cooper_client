import React, { Component } from "react";
import DisplayCooperResult from "./components/DisplayCooperResult";
import InputFields from "./components/InputFields";
import LoginForm from "./components/LoginForm";
import { authenticate } from "./modules/auth";
import DisplayPerformanceData from "./components/DisplayPerformanceData";
import DisplayChart from "./components/DisplayChart";
import SignupForm from "./components/SignupForm";
import { signup, signout } from "./modules/auth";

class App extends Component {
  state = {
    distance: "",
    gender: "female",
    age: "",
    renderLoginForm: false,
    renderSignupForm: false,
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
      e.target.password.value,
      e.target.password_confirmation.value
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
      this.setState({ authenticated: false });
      sessionStorage.removeItem("credentials");
    } else {
      this.setState({ message: response.message });
    }
  };

  render() {
    const {
      renderLoginForm,
      renderSignupForm,
      authenticated,
      message
    } = this.state;
    let renderLogin;
    let renderSignup;
    let renderLogout;
    let performanceDataIndex;
    let performanceDataGraph;
    switch (true) {
      case renderLoginForm && !authenticated:
        renderLogin = <LoginForm submitFormHandler={this.onLogin} />;
        break;

      case renderSignupForm && !authenticated:
        renderSignup = (
          <>
            <p>Please fill in your information</p>
            <SignupForm submitFormHandler={this.onSignup} />
          </>
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
        renderSignup = (
          <>
            <button
              id="signup"
              onClick={() => this.setState({ renderSignupForm: true })}
            >
              Signup
            </button>
            <p>{message}</p>
          </>
        );
        break;

      case authenticated:
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
        {renderSignup}
        {renderLogout}
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
