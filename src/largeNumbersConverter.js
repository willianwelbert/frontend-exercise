import digitConverter from "./digitConverter";

const largeNumbersConverter = (input) => {
  const mutableInput = [...input];

  const convertableInputs = [];

  for (let i = 0; mutableInput.length > 0; i++) {
    const thirdIndexFromEnd = mutableInput.length - 3;
    const startIndex = thirdIndexFromEnd > 0 ? thirdIndexFromEnd : 0;
    const threeDigitInput = mutableInput.splice(startIndex, 3);
    convertableInputs.push(threeDigitInput);
  }

  const result = convertableInputs.map((inputArray) =>
    digitConverter(inputArray)
  );

  const filteredResult = result.filter((value) => value !== undefined);

  const term = result.length > 2 ? "million" : "thousand";

  switch (filteredResult.length) {
    case 1:
      return `${filteredResult[0]} ${term}`;
    case 2:
      return `${filteredResult[1]} thousand ${filteredResult[0]}`;
    case 3:
      return `${filteredResult[2]} million ${filteredResult[1]} thousand ${filteredResult[0]}`;
    default:
      return "";
  }
};

export default largeNumbersConverter;
