import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import { useGetItemById } from "../src/utils/useGetItemById";
import { ReactTreeListItemType } from "../src";

describe("useGetItemById", () => {
  it("should fail to find an id in empty data", () => {
    const UseUniqueIdComponent = () => {
      const getItemById = useGetItemById<ReactTreeListItemType>([]);

      const item = getItemById("");

      expect(item).eq(undefined);

      return null;
    };

    const wrapper = shallow(<UseUniqueIdComponent />);

    wrapper.render();
  });

  it("should fail to find an id in data", () => {
    const UseUniqueIdComponent = () => {
      const getItemById = useGetItemById<ReactTreeListItemType>([
        {
          id: "A1",
          label: "A1",
        },
        {
          id: "A2",
          label: "A2",
          children: [
            {
              id: "B2",
              label: "B2",
              children: [
                {
                  id: "C2",
                  label: "C2",
                },
              ],
            },
          ],
        },
      ]);

      const item = getItemById("");

      expect(item).eq(undefined);

      return null;
    };

    const wrapper = shallow(<UseUniqueIdComponent />);

    wrapper.render();
  });

  it('should find a nested item with id of "C2" in nested data', () => {
    const UseUniqueIdComponent = () => {
      const getItemById = useGetItemById<ReactTreeListItemType>([
        {
          id: "A1",
          label: "A1",
        },
        {
          id: "A2",
          label: "A2",
          children: [
            {
              id: "B2",
              label: "B2",
              children: [
                {
                  id: "C2",
                  label: "C2",
                },
              ],
            },
          ],
        },
      ]);

      const item = getItemById("C2");

      if (item) {
        expect(item.id).eq("C2");
        expect(item.label).eq("C2");
      } else {
        expect(item).to.not.eq(undefined);
      }

      return null;
    };

    const wrapper = shallow(<UseUniqueIdComponent />);

    wrapper.render();
  });
});
