import React from "react";
import render from "react-test-renderer";

import Page1 from "./screens/Page1/Page1";

describe("marginTop shoud be 5%", () => {
    const { getByText } = render(<Page1 />);
    expect(getByText(/marginTop Page1/i).parentElement).toHaveStyle(`marginTop: 5%`);
})