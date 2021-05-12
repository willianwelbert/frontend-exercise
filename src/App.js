import React, { useState } from "react";

import validation from "./validation";
import threeDigitConverter from "./threeDigitConverter";
import { invertedDictionary } from "./dictionary";

function App() {
  const [error, setError] = useState("");
  const [output, setOutput] = useState("");

  const inFullToNumber = (input) => {
    const dividedInput = input.split(" ");
    const inputSize = dividedInput.length;
    const dictionary = invertedDictionary();

    const oneWord = (input) => {
      return dictionary[input]
        ? dictionary[input]
        : "Sorry, we could not find that number";
    };

    const multipleWords = (input) => {
      const reducer = (acc, current) => {
        const key = dictionary[current] || 0;
        const numericKey = Number(key);
        return key.length > 2 ? acc * numericKey : acc + numericKey;
      };
      return input.reduce(reducer, 0);
    };

    inputSize > 1
      ? setOutput(multipleWords(dividedInput))
      : setOutput(oneWord(dividedInput));
  };

  const numberToInFull = (input) => {
    const inputSize = input.length;

    if (inputSize > 3) {
      const mutableInput = [...input];

      const convertableInputs = [];

      for (let i = 0; mutableInput.length > 0; i++) {
        const thirdIndexFromEnd = mutableInput.length - 3;
        const startIndex = thirdIndexFromEnd > 0 ? thirdIndexFromEnd : 0;
        const threeDigitInput = mutableInput.splice(startIndex, 3);
        convertableInputs.push(threeDigitInput);
      }

      const result = convertableInputs.map((inputArray) =>
        threeDigitConverter(inputArray)
      );

      const filteredResult = result.filter((value) => value !== undefined);

      const term = result.length > 2 ? "million" : "thousand";

      switch (filteredResult.length) {
        case 1:
          return setOutput(`${filteredResult[0]} ${term}`);
        case 2:
          return setOutput(
            `${filteredResult[1]} thousand ${filteredResult[0]}`
          );
        case 3:
          return setOutput(
            `${filteredResult[2]} million ${filteredResult[1]} thousand ${filteredResult[0]}`
          );
        default:
          return setOutput("");
      }
    }

    return setOutput(threeDigitConverter(input));
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
