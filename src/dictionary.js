const ones = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};

const tens = {
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
  20: "twenty",
  30: "thirty",
  40: "forty",
  50: "fifty",
  60: "sixty",
  70: "seventy",
  80: "eighty",
  90: "ninety",
};

const hundredsAndAbove = {
  100: "hundred",
  1000: "thousand",
  1000000: "million",
};

const dictionary = {
  ...ones,
  ...tens,
  ...hundredsAndAbove,
};

const invertedDictionary = () => {
  const inverted = {};
  for (const key in dictionary) {
    inverted[dictionary[key]] = key;
  }
  return inverted;
};

export { dictionary, ones, tens, hundredsAndAbove, invertedDictionary };
