import React from "react";
import render from "react-test-renderer";

import App from "./App";

describe("<App />, () => {
  it ("has 10 child", () =>{
    const tree = render.create(<App />).toJSON();
    expect(ree.children.length).toBe(10);
  });
});