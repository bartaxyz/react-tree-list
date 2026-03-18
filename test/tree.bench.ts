import { bench, describe } from "vitest";
import { ReactTreeListItemType } from "../src/types";
import { getItemById, updateItemById, setSelectedById } from "../src/tree";

// ─── Tree generator ───────────────────────────────────────────────────────────

const makeTree = (
  depth: number,
  breadth: number,
  prefix = ""
): ReactTreeListItemType[] =>
  Array.from({ length: breadth }, (_, i) => {
    const id = prefix ? `${prefix}.${i}` : String(i);
    return {
      id,
      label: `Item ${id}`,
      ...(depth > 1 ? { children: makeTree(depth - 1, breadth, id) } : {}),
    };
  });

const lastId = (depth: number, breadth: number): string =>
  Array.from({ length: depth }, () => String(breadth - 1)).join(".");

const small = makeTree(1, 50); // 50 nodes
const medium = makeTree(3, 8); // 584 nodes
const large = makeTree(4, 8); // 4680 nodes

// ─── getItemById ──────────────────────────────────────────────────────────────

describe("getItemById", () => {
  bench("small  –   50 nodes", () => {
    getItemById(small, lastId(1, 50));
  });

  bench("medium –  584 nodes", () => {
    getItemById(medium, lastId(3, 8));
  });

  bench("large  – 4680 nodes", () => {
    getItemById(large, lastId(4, 8));
  });
});

// ─── updateItemById ───────────────────────────────────────────────────────────

describe("updateItemById – first item (best case)", () => {
  bench("small  –   50 nodes", () => {
    updateItemById(small, "0", { label: "updated" });
  });

  bench("medium –  584 nodes", () => {
    updateItemById(medium, "0", { label: "updated" });
  });

  bench("large  – 4680 nodes", () => {
    updateItemById(large, "0", { label: "updated" });
  });
});

describe("updateItemById – last item (worst case)", () => {
  bench("small  –   50 nodes", () => {
    updateItemById(small, lastId(1, 50), { label: "updated" });
  });

  bench("medium –  584 nodes", () => {
    updateItemById(medium, lastId(3, 8), { label: "updated" });
  });

  bench("large  – 4680 nodes", () => {
    updateItemById(large, lastId(4, 8), { label: "updated" });
  });
});

// ─── setSelectedById ─────────────────────────────────────────────────────────

describe("setSelectedById", () => {
  bench("small  –   50 nodes", () => {
    setSelectedById(small, lastId(1, 50));
  });

  bench("medium –  584 nodes", () => {
    setSelectedById(medium, lastId(3, 8));
  });

  bench("large  – 4680 nodes", () => {
    setSelectedById(large, lastId(4, 8));
  });
});
