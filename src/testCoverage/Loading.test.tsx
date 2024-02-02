import "@testing-library/jest-dom";
import { Loading } from "../Components/Loading";
import { render, screen } from "@testing-library/react";

describe("Loading component", () => {
  it("should render the Loading Element", () => {
    render(<Loading />);
    const loadingElement = screen.getByTestId("sr-loading");
    expect(loadingElement).toBeInTheDocument();
  });
});
