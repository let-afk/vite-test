const getOnlyNum = (str) => +str.replace(/\D/g, "");

describe("getOnlyNum test", () => {
  it("getOnlyNum return num", () => {
    const expected = 12;
    const received = getOnlyNum("w1afa2");
    expect(received).toBe(expected);
  });
  // it("getOnlyNum return 0 if it gets a string without a number", () => {
  //   expected = 0;
  //   const received = getOnlyNum("w");
  //   expect(received).toBe(expected);
  // });
});
