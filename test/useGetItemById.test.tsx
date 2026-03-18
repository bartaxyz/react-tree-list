import { ReactTreeListItemType } from "../src";
import { getItemById } from "../src/tree";

const nestedData: ReactTreeListItemType[] = [
  { id: "A1", label: "A1" },
  {
    id: "A2",
    label: "A2",
    children: [
      {
        id: "B2",
        label: "B2",
        children: [{ id: "C2", label: "C2" }],
      },
    ],
  },
];

describe("getItemById", () => {
  it("should return undefined for empty data", () => {
    expect(getItemById([], "")).toBeUndefined();
  });

  it("should return undefined when id is not found", () => {
    expect(getItemById(nestedData, "")).toBeUndefined();
  });

  it('should find nested item with id "C2"', () => {
    const item = getItemById(nestedData, "C2");
    expect(item?.id).toBe("C2");
    expect(item?.label).toBe("C2");
  });
});
