import { renderHook } from "@testing-library/react";
import { useUniqueId } from "../src/hooks/useUniqueId";

const hasDuplicates = (array: string[]) => new Set(array).size !== array.length;

describe("useUniqueId", () => {
  it("should generate 256 unique ids", () => {
    const { result } = renderHook(() => useUniqueId());
    const ids: string[] = [];
    for (let i = 0; i < 256; i++) {
      ids.push(result.current.generate());
    }
    expect(hasDuplicates(ids)).toBe(false);
  });
});
