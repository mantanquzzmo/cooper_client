import React from "react";

const LoginForm = ({ submitFormHandler, submitSignupHandler }) => {
  return (
    <>
    <h1>Welcome to Runners Lounge! Please Login or Signup</h1>
    <div class="ui placeholder segment">
      <div class="ui stackable very relaxed two column grid">
        <div class="column">
          <form class="ui form" onSubmit={submitFormHandler} id="login-form">
            <div class="field">
              <label>Email</label>
              <div class="ui left icon input">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  id="email"
                />
                <i aria-hidden="true" class="user icon"></i>
              </div>
            </div>
            <div class="field">
              <label>Password</label>
              <div class="ui left icon input">
                <input name="password" type="password" id="password" />
                <i aria-hidden="true" class="lock icon"></i>
              </div>
            </div>
            <button id="submit" class="ui primary button">
              Login
            </button>
          </form>
        </div>
        <div class="middle aligned column">
          <form class="ui form" onSubmit={submitSignupHandler} id="signup-form">
            <div class="field">
              <label>Email</label>
              <div class="ui left icon input">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  id="email"
                />
                <i aria-hidden="true" class="user icon"></i>
              </div>
            </div>
            <div class="field">
              <label>Password</label>
              <div class="ui left icon input">
                <input name="password" type="password" id="password" />
                <i aria-hidden="true" class="lock icon"></i>
              </div>
            </div>
            <button id="submit" class="ui primary button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div class="ui vertical divider">Or</div>
    </div>
    </>
  );
};

export default LoginForm;
