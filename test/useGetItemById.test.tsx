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
});
