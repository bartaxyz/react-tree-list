import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import React, { useState } from "react";
import { ReactTreeList, ReactTreeListProps } from "../src";
import ReactSixteenAdapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new ReactSixteenAdapter() });

describe("ReactTreeList", () => {
  it("should render with empty data", () => {
    const Component = () => {
      const [data, setData] = useState<ReactTreeListProps["data"]>([]);

      return <ReactTreeList data={data} onChange={setData} />;
    };

    const wrapper = shallow(<Component />);

    const render = wrapper.render();

    expect(render.children).to.have.lengthOf(1);
  });

  it("should render with flat data object", () => {
    const Component = () => {
      const [data, setData] = useState<ReactTreeListProps["data"]>([
        {
          label: "Test #1",
          arrow: ">",
        },
        {
          label: "Test #2",
          arrow: ">",
        },
      ]);

      return <ReactTreeList data={data} onChange={setData} />;
    };

    const wrapper = shallow(<Component />);

    const render = wrapper.render();

    expect(render.children).to.have.lengthOf(1);
  });

  it("should render with deep data object", () => {
    const Component = () => {
      const [data, setData] = useState<ReactTreeListProps["data"]>([
        {
          label: "Test #1",
          arrow: ">",
          children: [
            {
              label: "Test #2",
              arrow: ">",
            },
            {
              label: "Test #3",
              arrow: ">",
            },
          ],
        },
      ]);

      return (
        <ReactTreeList
          data={data}
          onChange={setData}
          itemDefaults={{ open: true, icon: "-" }}
        />
      );
    };

    const wrapper = shallow(<Component />);

    const render = wrapper.render();

    expect(render.children).to.have.lengthOf(1);
  });
});
