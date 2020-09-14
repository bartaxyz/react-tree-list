import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import { useUniqueId } from "../src/hooks/useUniqueId";

const hasDuplicates = (array: string[]) => {
  return new Set(array).size !== array.length;
};

describe("useUniqueId hook", () => {
  it("expect all ids to be unique", () => {
    const UseUniqueIdComponent = () => {
      const ids: string[] = [];
      const { generate } = useUniqueId();

      for (let i = 0; i < 256; ++i) {
        ids.push(generate());
      }

      expect(hasDuplicates(ids)).eq(false);

      return null;
    };

    const wrapper = shallow(<UseUniqueIdComponent />);

    wrapper.render();

    expect(wrapper);
  });
});
