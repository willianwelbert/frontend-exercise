import React, { useState } from "react";

import validation from "./validation";

import digitConverter from "./digitConverter";
import largeNumbersConverter from "./largeNumbersConverter";

import stringConverter from "./stringConverter";

function App() {
  const [error, setError] = useState("");
  const [output, setOutput] = useState("");

  const inFullToNumber = (input) => {
    setOutput(stringConverter(input));
  };

  const numberToInFull = (input) => {
    const inputSize = input.length;

    return inputSize > 3
      ? setOutput(largeNumbersConverter(input))
      : setOutput(digitConverter(input));
  };

  const handleChange = (evt) => {
    setError("");
    const input = evt.target.value;
    isNaN(input) ? inFullToNumber(input) : numberToInFull(input);
    validation(input, setError);
  };

  return (
    <div>
      <label htmlFor="number-name-converter">Number ↔️ Name converter</label>
      <br />
      <input
        type="text"
        id="number-name-converter"
        onChange={(evt) => handleChange(evt)}
      />
      <div>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <p>Output: {output}</p>
        )}
      </div>
    </div>
  );
}

export default App;
