import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Chat } from "../Chat";

describe("Chat tests", () => {
  it("matches snaphot", () => {
    const result = render(<Chat />);

    expect(result).toMatchSnapshot();
  });
});
