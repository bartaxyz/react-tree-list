import { render } from "@testing-library/react";
import React, { useState } from "react";
import { ReactTreeList, ReactTreeListProps } from "../src";

describe("ReactTreeList", () => {
  it("should render with empty data", () => {
    const Component = () => {
      const [data, setData] = useState<ReactTreeListProps["data"]>([]);
      return <ReactTreeList data={data} onChange={setData} />;
    };

    const { container } = render(<Component />);
    expect(container.firstChild).toBeTruthy();
  });

  it("should render with flat data", () => {
    const Component = () => {
      const [data, setData] = useState<ReactTreeListProps["data"]>([
        { label: "Test #1", arrow: ">" },
        { label: "Test #2", arrow: ">" },
      ]);
      return <ReactTreeList data={data} onChange={setData} />;
    };

    const { container } = render(<Component />);
    expect(container.firstChild).toBeTruthy();
  });

  it("should render with nested data", () => {
    const Component = () => {
      const [data, setData] = useState<ReactTreeListProps["data"]>([
        {
          label: "Test #1",
          arrow: ">",
          children: [
            { label: "Test #2", arrow: ">" },
            { label: "Test #3", arrow: ">" },
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

    const { container } = render(<Component />);
    expect(container.firstChild).toBeTruthy();
  });
});
