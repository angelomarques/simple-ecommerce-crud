import { Button } from "@/components/ui/button";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

test("hello world!", () => {
  render(<Button>Click me</Button>);
  expect(1).toEqual(1);
});
