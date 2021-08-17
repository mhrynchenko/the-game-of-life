import { renderHook } from "@testing-library/react-hooks";
import { act } from "@testing-library/react";

import { useGame } from "../";
import { useInterval } from "../../common";

jest.mock("../../common", () => ({
  useInterval: jest.fn()
}));

describe("Tests for useGame hook", () => {
  let hook;
  const testSpeed = 100;
  const testRows = 2;
  const testCols = 2;

  beforeEach(() => {
    hook = renderHook(() =>
      useGame({ rows: testRows, cols: testCols, speed: testSpeed })
    );
  });

  test("It should return grid with a specified size", () => {
    const { result: { current: { grid } } } = hook;
    
    expect(grid).toBeDefined();
    expect(grid.length).toEqual(testRows);
  });

  test("It should call life loop", () => {
    expect(useInterval).toHaveBeenCalledTimes(2);
  });

  test("It should call initLife and createGeneration", () => {
    const { result: { current } } = hook;

    expect(current.createGeneration).toBeDefined();
    expect(current.initLife).toBeDefined();

    const initLifeSpy = jest.spyOn(current, "initLife");
    const createGenerationSpy = jest.spyOn(current, "createGeneration");

    act(() => {
      current.initLife(current.grid);
      current.createGeneration();
    });

    expect(createGenerationSpy).toHaveBeenCalledTimes(1);
    expect(initLifeSpy).toHaveBeenCalledTimes(1);
  });

  test("It should return different matrix after createGeneration call", () => {
    const { result: { current } } = hook;

    expect(current.createGeneration).toBeDefined();

    const prevResult = current.grid;

    act(() => {
      current.createGeneration();
    });

    expect(prevResult[0]).not.toEqual(current[0]);
  });
});
