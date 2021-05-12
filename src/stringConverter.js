import { invertedDictionary } from "./dictionary";

const stringConverter = (input) => {
  const dictionary = invertedDictionary();
  const dividedInput = input.split(" ");
  const inputSize = dividedInput.length;

  const oneWord = (input) => {
    return dictionary[input]
      ? dictionary[input]
      : "Sorry, we could not find that number";
  };

  const multipleWords = (input) => {
    const largeNumbers = [];
    const reducer = (acc, current, index, input) => {
      const key = dictionary[current] || "0";
      const numericKey = Number(key);

      const previousInput = input[index - 1];
      const previousKey = dictionary[previousInput] || 0;
      const previousNumericKey = Number(previousKey);

      if (key.length === 3)
        return previousNumericKey * numericKey - previousNumericKey + acc;

      if (key.length > 3) {
        largeNumbers.push(acc * numericKey);
        return acc * 0;
      }

      return acc + numericKey;
    };

    const lowestNumber = input.reduce(reducer, 0);
    const largestNumber = largeNumbers.reduce(
      (acc, current) => acc + current,
      0
    );

    return lowestNumber + largestNumber;
  };

  return inputSize > 1 ? multipleWords(dividedInput) : oneWord(dividedInput);
};

export default stringConverter;
