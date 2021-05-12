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

    //
    //token array positions are 'million', 'thousand', 'hundred'
    //those can help me identify output size
    //

    //from the top:
    //zero always returns 0

    const oneWord = (input) => {
      return dictionary[input]
        ? dictionary[input]
        : "Sorry, we could not find that number";
    };

    const twoWords = (input) => {
      const reducer = (acc, current) => {
        const key = dictionary[current] || 0;
        const numericKey = Number(key);
        return key.length > 2 ? acc * numericKey : acc + numericKey;
      };
      return input.reduce(reducer, 0);
    };

    // const threeWords = (input) => {
    //   const numbersOnly = input.filter((entry) => entry !== "and");

    //   const reducer = (acc, current) => {
    //     const key = dictionary[current] || 0;
    //     const numericKey = Number(key);
    //     return key.length > 2 ? acc * numericKey : acc + numericKey;
    //   };
    //   return numbersOnly.reduce(reducer, 0);
    // };

    switch (inputSize) {
      case 1:
        return setOutput(oneWord(dividedInput));
      case 2:
        return setOutput(twoWords(dividedInput));
      case 3:
        return setOutput(twoWords(dividedInput));
      default:
        return setOutput(twoWords(dividedInput));
    }

    //three words is where we start to get dirty
    // one hundred and twenty two
    // 'one hundred' could be read as 1 input, 'and' is ignored (filter?)
    //so grabing 'hundred' and then index -1 should give me a searchable number
    //that number * 100
    // 1 * 100 + 20 + 2 => 100 + 20 + 2 => 122

    //from the logic above is just a matter of token vs multiplication factor
    // [1] * 1000 = thousand
    // [1] * 100000 = million
    // where [1] is number before token (index -1)
    // and token is a dictionary item
    // 9 * thousand + 20 + 2
    // 9 * 1000 + 20 + 2
    // 9000 + 20 +2
    // 9022
    // nine thousand twenty two
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
