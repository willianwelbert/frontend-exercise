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
});
