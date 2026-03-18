import { ReactTreeListItemType } from "../src";
import { useGetItemById } from "../src/utils/useGetItemById";

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

describe("useGetItemById", () => {
  it("should return undefined for empty data", () => {
    const getItemById = useGetItemById<ReactTreeListItemType>([]);
    expect(getItemById("")).toBeUndefined();
  });

  it("should return undefined when id is not found", () => {
    const getItemById = useGetItemById<ReactTreeListItemType>(nestedData);
    expect(getItemById("")).toBeUndefined();
  });

  it('should find nested item with id "C2"', () => {
    const getItemById = useGetItemById<ReactTreeListItemType>(nestedData);
    const item = getItemById("C2");
    expect(item?.id).toBe("C2");
    expect(item?.label).toBe("C2");
  });
});
