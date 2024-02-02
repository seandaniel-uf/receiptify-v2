import { Header } from "../Components/Header";
import { render } from "@testing-library/react";

describe("header component", () => {
  it("should render the title Spotify Receipts", () => {
    const headerElement = render(
      <Header title="Spotify Receipts" subTitle="Top Tracks Generator" />
    );
    // const headerElement = screen.getByTestId("sr-header");
    expect(headerElement).toBeInTheDocument();
  });
});
