const validation = (input, errorFunction) => {
  const isNumber = !isNaN(input);
  const invalidCharsRegex = new RegExp(/[^\w\s~]/gi);
  const isDigit = new RegExp(/\d/gm);

  const invalidChars = input.match(invalidCharsRegex);
  const mixedInputs = input
    .split("")
    .filter((charInput) => isDigit.test(charInput));

  const numberIsTooBig = isNumber && input.length > 9;
  const hasInvalidChars = !isNumber && invalidChars;
  const hasMixedInputs =
    !isNumber && !hasInvalidChars && mixedInputs.length > 0;

  numberIsTooBig && errorFunction("Number too big");

  hasInvalidChars && errorFunction(`Invalid character(s): '${invalidChars}'`);

  hasMixedInputs &&
    errorFunction("Invalid input, please type numbers OR their names in full");
};

export default validation;
