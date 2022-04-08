import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Form } from "../Form";

describe("Chat tests", () => {
  it("matches snaphot", () => {
    const result = render(<Form />);

    expect(result).toMatchSnapshot();
  });
});
