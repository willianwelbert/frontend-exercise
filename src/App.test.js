import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

describe("App", () => {
  it("should render correctly", () => {
    render(<App />);
    const input = screen.getByRole("textbox", {
      name: "Number ↔️ Name converter",
    });
    screen.getByText("Output:");
    expect(input).toBeDefined();
  });

  describe("input validation", () => {
    it("should throw an error on numbers higher than 999 million", () => {
      render(<App />);
      const input = screen.getByRole("textbox", {
        name: "Number ↔️ Name converter",
      });

      userEvent.type(input, "9999999999");
      screen.getByText("Number too big");
    });

    it("should throw an error on invalid chars", () => {
      render(<App />);
      const input = screen.getByRole("textbox", {
        name: "Number ↔️ Name converter",
      });

      userEvent.type(input, "-");
      screen.getByText("Invalid character(s): '-'");

      userEvent.clear(input);

      userEvent.type(input, "one hundred-twenty-two");
      screen.getByText("Invalid character(s): '-,-'");
    });

    it("should throw an error on type mixes", () => {
      render(<App />);
      const input = screen.getByRole("textbox", {
        name: "Number ↔️ Name converter",
      });

      userEvent.type(input, "ninety 4");
      screen.getByText(
        "Invalid input, please type numbers OR their names in full"
      );
    });
  });

  describe("convertion: number to in full name", () => {
    test("zero is always zero", () => {
      render(<App />);

      const input = screen.getByRole("textbox", {
        name: "Number ↔️ Name converter",
      });

      userEvent.type(input, "000");
      screen.getByText("Output: zero");

      userEvent.clear(input);

      userEvent.type(input, "0000");
      screen.getByText("Output: zero");

      userEvent.clear(input);

      userEvent.type(input, "0000000");
      screen.getByText("Output: zero");

      userEvent.clear(input);

      userEvent.type(input, "100000000");
      screen.getByText("Output: one hundred million");

      userEvent.clear(input);

      userEvent.type(input, "000000001");
      screen.getByText("Output: one");

      userEvent.clear(input);

      userEvent.type(input, "000000010");
      screen.getByText("Output: ten");

      userEvent.clear(input);

      userEvent.type(input, "000000100");
      screen.getByText("Output: one hundred");
    });

    test("one digit", () => {
      render(<App />);

      const input = screen.getByRole("textbox", {
        name: "Number ↔️ Name converter",
      });

      userEvent.type(input, "9");
      screen.getByText("Output: nine");

      userEvent.clear(input);

      userEvent.type(input, "0");
      screen.getByText("Output: zero");
    });

    test("simple two digits", () => {
      render(<App />);

      const input = screen.getByRole("textbox", {
        name: "Number ↔️ Name converter",
      });

      userEvent.type(input, "90");
      screen.getByText("Output: ninety");

      userEvent.clear(input);

      userEvent.type(input, "11");
      screen.getByText("Output: eleven");
    });

    test("compound two digits", () => {
      render(<App />);

      const input = screen.getByRole("textbox", {
        name: "Number ↔️ Name converter",
      });

      userEvent.type(input, "99");
      screen.getByText("Output: ninety nine");

      userEvent.clear(input);

      userEvent.type(input, "22");
      screen.getByText("Output: twenty two");
    });

    test("three digits", () => {
      render(<App />);

      const input = screen.getByRole("textbox", {
        name: "Number ↔️ Name converter",
      });

      userEvent.type(input, "112");
      screen.getByText("Output: one hundred and twelve");

      userEvent.clear(input);

      userEvent.type(input, "400");
      screen.getByText("Output: four hundred");

      userEvent.clear(input);

      userEvent.type(input, "999");
      screen.getByText("Output: nine hundred and ninety nine");
    });

    test("four to six digits", () => {
      render(<App />);

      const input = screen.getByRole("textbox", {
        name: "Number ↔️ Name converter",
      });

      userEvent.type(input, "9999");
      screen.getByText("Output: nine thousand nine hundred and ninety nine");

      userEvent.clear(input);

      userEvent.type(input, "100000");
      screen.getByText("Output: one hundred thousand");
    });

    test("seven to nine digits", () => {
      render(<App />);

      const input = screen.getByRole("textbox", {
        name: "Number ↔️ Name converter",
      });

      userEvent.type(input, "1000000");
      screen.getByText("Output: one million");

      userEvent.clear(input);

      userEvent.type(input, "10000000");
      screen.getByText("Output: ten million");

      userEvent.clear(input);

      userEvent.type(input, "100000000");
      screen.getByText("Output: one hundred million");

      userEvent.clear(input);

      userEvent.type(input, "999999999");
      screen.getByText(
        "Output: nine hundred and ninety nine million nine hundred and ninety nine thousand nine hundred and ninety nine"
      );
    });
  });

  describe("convertion: in full name to number", () => {
    test("not a number in full", () => {
      render(<App />);

      const input = screen.getByRole("textbox", {
        name: "Number ↔️ Name converter",
      });

      userEvent.type(input, "apple");
      screen.getByText("Output: Sorry, we could not find that number");
    });

    test("zero is always zero", () => {
      render(<App />);

      const input = screen.getByRole("textbox", {
        name: "Number ↔️ Name converter",
      });

      userEvent.type(input, "zero zero");
      screen.getByText("Output: 0");

      userEvent.clear(input);

      userEvent.type(input, "one hundred and zero");
      screen.getByText("Output: 100");
    });

    test("one digit", () => {
      render(<App />);

      const input = screen.getByRole("textbox", {
        name: "Number ↔️ Name converter",
      });

      userEvent.type(input, "one");
      screen.getByText("Output: 1");

      userEvent.clear(input);

      userEvent.type(input, "zero");
      screen.getByText("Output: 0");

      userEvent.clear(input);

      userEvent.type(input, "nine");
      screen.getByText("Output: 9");
    });

    test("two digits", () => {
      render(<App />);

      const input = screen.getByRole("textbox", {
        name: "Number ↔️ Name converter",
      });

      userEvent.type(input, "ten");
      screen.getByText("Output: 10");

      userEvent.clear(input);

      userEvent.type(input, "fifteen");
      screen.getByText("Output: 15");

      userEvent.clear(input);

      userEvent.type(input, "thirty");
      screen.getByText("Output: 30");

      userEvent.clear(input);

      userEvent.type(input, "ninety nine");
      screen.getByText("Output: 99");
    });

    test("three digits", () => {
      render(<App />);

      const input = screen.getByRole("textbox", {
        name: "Number ↔️ Name converter",
      });

      userEvent.type(input, "one hundred");
      screen.getByText("Output: 100");

      userEvent.clear(input);

      userEvent.type(input, "one hundred and fifty");
      screen.getByText("Output: 150");

      userEvent.clear(input);

      userEvent.type(input, "nine hundred and ninety nine");
      screen.getByText("Output: 999");

      userEvent.clear(input);

      userEvent.type(input, "five hundred and five");
      screen.getByText("Output: 505");
    });

    test("larger numbers", () => {
      render(<App />);

      const input = screen.getByRole("textbox", {
        name: "Number ↔️ Name converter",
      });

      userEvent.type(input, "nine thousand nine hundred and ninety nine");
      screen.getByText("Output: 9999");

      userEvent.clear(input);

      userEvent.type(input, "one hundred thousand");
      screen.getByText("Output: 100000");

      userEvent.clear(input);

      userEvent.type(input, "one million");
      screen.getByText("Output: 1000000");

      userEvent.clear(input);

      userEvent.type(input, "ten million");
      screen.getByText("Output: 10000000");

      userEvent.clear(input);

      userEvent.type(input, "one hundred million");
      screen.getByText("Output: 100000000");

      userEvent.clear(input);

      userEvent.type(
        input,
        "nine hundred and ninety nine million nine hundred and ninety nine thousand nine hundred and ninety nine"
      );
      screen.getByText("Output: 999999999");
    });
  });
});
