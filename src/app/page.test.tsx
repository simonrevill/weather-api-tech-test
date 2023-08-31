import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";

describe("Test setup", () => {
  it("renders test button component", () => {
    render(<Home />);

    const button = screen.getByRole("button", { name: /Test button/i });

    expect(button).toBeInTheDocument();
  });
});
