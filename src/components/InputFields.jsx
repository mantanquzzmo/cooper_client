import React from "react";

const InputFields = ({ onChangeHandler }) => {
  return (
    <>
    <div class="entries">
      <div class="ui right labeled input">
        <input
          onChange={onChangeHandler}
          name="distance"
          id="distance"
          placeholder="Enter distance"
        ></input>
        <div class="ui basic label label">m</div>
      </div>

      <div class="ui right labeled input">
        <input
          onChange={onChangeHandler}
          name="age"
          id="age"
          placeholder="Enter age"
        ></input>
        <div class="ui basic label label">y</div>
      </div>

      <select onChange={onChangeHandler} name="gender" id="gender" class="ui selection dropdown">
        <option value="female">Female</option>
        <option value="male">Male</option>
      </select>
      </div>
    </>
  );
};

export default InputFields;
