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
    const reducer = (acc, current) => {
      const key = dictionary[current] || 0;
      const numericKey = Number(key);
      return key.length > 2 ? acc * numericKey : acc + numericKey;
    };
    return input.reduce(reducer, 0);
  };

  return inputSize > 1 ? multipleWords(dividedInput) : oneWord(dividedInput);
};

export default stringConverter;
