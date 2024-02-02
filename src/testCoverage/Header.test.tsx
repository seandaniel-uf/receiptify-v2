import "@testing-library/jest-dom";
import { Header } from "../Components/Header";
import { render, screen } from "@testing-library/react";

describe("header component", () => {
  it("should render the Header element", () => {
    render(<Header title="Spotify Receipts" subTitle="Top Music Generator" />);
    const headerElement = screen.getByTestId("sr-header");
    expect(headerElement).toBeInTheDocument();
  });
});
