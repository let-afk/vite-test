import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChatContainer } from "../ChatContainer";

describe("Chat tests", () => {
  it("matches snaphot", () => {
    const result = render(<ChatContainer />);

    expect(result).toMatchSnapshot();
  });
});
