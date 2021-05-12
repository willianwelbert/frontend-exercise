import { ones, tens } from "./dictionary";

const threeDigitConverter = (input) => {
  const inputSize = input.length;
  const onesPosition = (input) => {
    return ones[input];
  };

  const tensPosition = (input) => {
    if (input[0] === "0") return `${onesPosition(input[1])}`;
    if (input[0] === "1") {
      const joinedInput = [...input].join("");
      return tens[joinedInput];
    }

    return tens[input]
      ? tens[input]
      : `${tens[input[0] * 10]} ${onesPosition(input[1])}`;
  };

  const hundredsPosition = (input) => {
    if ([...input].every((value) => value === "0")) return;
    const tensInHundred = tensPosition([input[1], input[2]].join(""));
    const shouldIgnoreTens = tensInHundred === "zero";
    return shouldIgnoreTens
      ? `${onesPosition(input[0])} hundred`
      : `${onesPosition(input[0])} hundred and ${tensInHundred}`;
  };

  switch (inputSize) {
    case 1:
      return onesPosition(input);
    case 2:
      return tensPosition(input);
    case 3:
      return hundredsPosition(input);
    default:
      return "";
  }
};

export default threeDigitConverter;
