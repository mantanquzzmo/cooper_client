import React from "react";

const SignupForm = ({ submitFormHandler }) => {
  return (
    <form onSubmit={submitFormHandler} id="signup-form">
      <label>Email</label>
      <input name="email" type="email" id="email"></input>

      <label>Password</label>
      <input name="password" type="password" id="password"></input>
      <label>Password confirmation</label>
      <input
        name="password_confirmation"
        type="password"
        id="password_confirmation"
      ></input>
      <button id="submit">Submit</button>
    </form>
  );
};

export default SignupForm;
