import React from "react";
import { render } from "@testing-library/react";

import { World } from "../";
import { createEmptyMatrix } from '../../../../utils';

describe("Tests for World component", () => {
  const testRows = 2;
  const testCols = 2;
  const testData = createEmptyMatrix(testRows, testCols);

  test("It should render grid", () => {
    const { container } = render(<World rows={testRows} cols={testCols} data={testData} />);

    expect(container.querySelector(".grid")).not.toBeNull();
  });

  test("It should check that grid doesn't have alive cells", () => {
    const { container } = render(<World rows={testRows} cols={testCols} data={testData} />);

    expect(container.querySelectorAll(".alive").length).toEqual(0);
  });
});
