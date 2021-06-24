/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import HomePage from "../pages/index";
import MyApp from "../pages/_app";

test("Check for Getting Started Text", () => {
  // const res = render(<MyApp />);
  const { getByText } = render(<HomePage />);
  expect(getByText("Loading please wait....")).toBeInTheDocument();
});
