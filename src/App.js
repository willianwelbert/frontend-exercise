import React, { useState } from "react";

import validation from "./validation";
import { tens, ones } from "./numberToName";

function App() {
  const [error, setError] = useState("");
  const [output, setOutput] = useState("");

  const inFullToNumber = () => {
    setOutput("someday this will be a number");
  };

  const numberToInFull = (input) => {
    const inputSize = input.length;

    // 1 million 100 thousand 5 hundred and 50
    // convertion should be done 3 by 3
    // > 3 appends 'thousand' to the string
    // > 6 appends 'million' to the string

    const onesPosition = (input) => {
      return ones[input];
    };

    const tensPosition = (input) => {
      if (input[0] === "0") return `${onesPosition(input[1])}`;

      return tens[input]
        ? tens[input]
        : `${tens[input[0] * 10]} ${onesPosition(input[1])}`;
    };

    const hundredsPosition = (input) => {
      const tensInHundred = tensPosition([input[1], input[2]].join(""));
      const shouldIgnoreTens = tensInHundred === "zero";
      return shouldIgnoreTens
        ? `${onesPosition(input[0])} hundred`
        : `${onesPosition(input[0])} hundred and ${tensInHundred}`;
    };

    switch (inputSize) {
      case 1:
        return setOutput(onesPosition(input));
      case 2:
        return setOutput(tensPosition(input));
      case 3:
        return setOutput(hundredsPosition(input));
      case 4:
      case 5:
      case 6:
        return setOutput("thousand");
      case 7:
      case 8:
      case 9:
        return setOutput("million");
      default:
        return setOutput("");
    }
  };

  const handleChange = (evt) => {
    setError("");
    const input = evt.target.value;
    !isNaN(input) ? numberToInFull(input) : inFullToNumber(input);
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
