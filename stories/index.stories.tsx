import React, { useState } from "react";
import { Meta } from "@storybook/react";
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
} from "@storybook/addon-docs/blocks";
import { rgba } from "polished";

import { ReactTreeList, ReactTreeListProps } from "../src";
import { getRandomEmoji } from "./utils/getRandomEmoji";
import { ReactTreeListItemType } from "../build";

export default {
  title: "Tree List",
  component: ReactTreeList,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Stories />
        </>
      ),
    },
  },
  argTypes: {
    label: { control: "text" },
  },
} as Meta;

export const withEmojis = () => {
  const [selectedId, setSelectedId] =
    useState<ReactTreeListProps["selectedId"]>("");

  const [data, setData] = useState<ReactTreeListProps["data"]>([
    {
      id: "1",
      label: "none",
      open: true,
      icon: getRandomEmoji(),
      children: [
        {
          id: "2",
          label: "Heyo",
          open: true,
          icon: getRandomEmoji(),
          children: [
            {
              label: "Heyo",
              icon: getRandomEmoji(),
              children: [{ label: "Heyo" }],
            },
          ],
        },
        {
          id: "3",
          label: "Heyo",
          icon: getRandomEmoji(),
          children: [
            {
              label: "Heyo",
              icon: getRandomEmoji(),
              children: [
                {
                  label: "Heyo",
                  icon: getRandomEmoji(),
                  children: [
                    {
                      label: "Heyo",
                      icon: getRandomEmoji(),
                      children: [
                        {
                          label: "Heyo",
                          icon: getRandomEmoji(),
                          children: [{ label: "Heyo" }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Heyo",
          icon: getRandomEmoji(),
          children: [
            {
              label: "Heyo",
              icon: getRandomEmoji(),
              children: [{ label: "Heyo" }],
            },
          ],
        },
        {
          label: "Heyo",
          open: true,
          icon: getRandomEmoji(),
          children: [
            {
              label: "Heyo",
              icon: getRandomEmoji(),
              children: [{ label: "Heyo" }],
            },
          ],
        },
        {
          label: "Heyo",
          icon: getRandomEmoji(),
          children: [
            {
              label: "Heyo",
              icon: getRandomEmoji(),
              children: [
                {
                  label: "Heyo",
                  icon: getRandomEmoji(),
                  children: [
                    {
                      label: "Heyo",
                      icon: getRandomEmoji(),
                      children: [
                        {
                          label: "Heyo",
                          icon: getRandomEmoji(),
                          children: [{ label: "Heyo" }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Heyo",
          icon: getRandomEmoji(),
          children: [
            {
              label: "Heyo",
              icon: getRandomEmoji(),
              children: [
                { label: "Heyo" },
                {
                  label: "Heyo",
                  icon: getRandomEmoji(),
                  children: [
                    {
                      label: "Heyo",
                      icon: getRandomEmoji(),
                      children: [
                        {
                          label: "Heyo",
                          icon: getRandomEmoji(),
                          children: [
                            {
                              label: "Heyo",
                              icon: getRandomEmoji(),
                              children: [
                                {
                                  label: "Heyo",
                                  icon: getRandomEmoji(),
                                  children: [{ label: "Heyo" }],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: "none",
      open: true,
      icon: getRandomEmoji(),
      children: [
        {
          label: "Heyo",
          open: true,
          icon: getRandomEmoji(),
          children: [
            {
              label: "Heyo",
              icon: getRandomEmoji(),
              children: [{ label: "Heyo" }],
            },
          ],
        },
        {
          label: "Heyo",
          icon: getRandomEmoji(),
          children: [
            {
              label: "Heyo",
              icon: getRandomEmoji(),
              children: [
                {
                  label: "Heyo",
                  icon: getRandomEmoji(),
                  children: [
                    {
                      label: "Heyo",
                      icon: getRandomEmoji(),
                      children: [
                        {
                          label: "Heyo",
                          icon: getRandomEmoji(),
                          children: [{ label: "Heyo" }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Heyo",
          icon: getRandomEmoji(),
          children: [
            {
              label: "Heyo",
              icon: getRandomEmoji(),
              children: [{ label: "Heyo" }],
            },
          ],
        },
        {
          label: "Heyo",
          open: true,
          icon: getRandomEmoji(),
          children: [
            {
              label: "Heyo",
              icon: getRandomEmoji(),
              children: [{ label: "Heyo" }],
            },
          ],
        },
        {
          label: "Heyo",
          icon: getRandomEmoji(),
          children: [
            {
              label: "Heyo",
              icon: getRandomEmoji(),
              children: [
                {
                  label: "Heyo",
                  icon: getRandomEmoji(),
                  children: [
                    {
                      label: "Heyo",
                      icon: getRandomEmoji(),
                      children: [
                        {
                          label: "Heyo",
                          icon: getRandomEmoji(),
                          children: [{ label: "Heyo" }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Heyo",
          icon: getRandomEmoji(),
          children: [
            {
              label: "Heyo",
              icon: getRandomEmoji(),
              children: [
                { label: "Heyo" },
                {
                  label: "Heyo",
                  icon: getRandomEmoji(),
                  children: [
                    {
                      label: "Heyo",
                      icon: getRandomEmoji(),
                      children: [
                        {
                          label: "Heyo",
                          icon: getRandomEmoji(),
                          children: [
                            {
                              label: "Heyo",
                              icon: getRandomEmoji(),
                              children: [
                                {
                                  label: "Heyo",
                                  icon: getRandomEmoji(),
                                  children: [{ label: "Heyo" }],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  function onDrop(
    dragingNode: ReactTreeListItemType,
    dragNode: ReactTreeListItemType,
    drogType: string
  ) {
    console.log("dragingNode:", dragingNode);
    console.log("dragNode:", dragNode);
    console.log("drogType:", drogType);
  }

  return (
    <ReactTreeList
      data={data}
      selectedId={selectedId}
      onDrop={onDrop}
      onSelected={(item) => {
        setSelectedId(item.id ?? undefined);
      }}
      onChange={setData}
      itemDefaults={{ open: false, arrow: "▸", icon: getRandomEmoji() }}
    />
  );
};

export const withCustomStyles = () => {
  const blockIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.23442 17.8482L7.61748 16.9245C7.734 16.9728 7.86257 17 8 17H9V18H8C7.72882 18 7.47024 17.946 7.23442 17.8482ZM15 18V17H16C16.1374 17 16.266 16.9728 16.3825 16.9245L16.7656 17.8482C16.5298 17.946 16.2712 18 16 18H15ZM18 9H17V8C17 7.86257 16.9728 7.734 16.9245 7.61748L17.8482 7.23442C17.946 7.47024 18 7.72882 18 8V9ZM9 6H8C7.72882 6 7.47024 6.05397 7.23442 6.15176L7.61748 7.07549C7.734 7.02717 7.86257 7 8 7H9V6ZM6 15H7V16C7 16.1374 7.02717 16.266 7.07549 16.3825L6.15176 16.7656C6.05397 16.5298 6 16.2712 6 16V15ZM6 13H7V11H6V13ZM6 9H7V8C7 7.86257 7.02717 7.734 7.07549 7.61748L6.15176 7.23442C6.05397 7.47024 6 7.72882 6 8V9ZM11 6V7H13V6H11ZM15 6V7H16C16.1374 7 16.266 7.02717 16.3825 7.07549L16.7656 6.15176C16.5298 6.05397 16.2712 6 16 6H15ZM18 11H17V13H18V11ZM18 15H17V16C17 16.1374 16.9728 16.266 16.9245 16.3825L17.8482 16.7656C17.946 16.5298 18 16.2712 18 16V15ZM13 18V17H11V18H13Z"
        fill="black"
        fillOpacity="0.5"
      />
    </svg>
  );

  const textIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 8C6 6.89543 6.89543 6 8 6H16C17.1046 6 18 6.89543 18 8V16C18 17.1046 17.1046 18 16 18H8C6.89543 18 6 17.1046 6 16V8Z"
        fill="black"
        fillOpacity="0.1"
      />
      <path
        d="M10.184 9.896H12.052V15H12.796V9.896H14.56V9.216H10.184V9.896Z"
        fill="black"
      />
    </svg>
  );

  const divLabel = (
    <span style={{ fontFamily: "Arial", fontSize: 12 }}>Div</span>
  );
  const spanLabel = (
    <span style={{ fontFamily: "Arial", fontSize: 12 }}>Span</span>
  );
  const [selectedId, setSelectedId] =
    useState<ReactTreeListProps["selectedId"]>("");

  const [data, setData] = useState<ReactTreeListProps["data"]>([
    {
      label: divLabel,
      open: true,
      children: [
        {
          label: divLabel,
          open: true,
          children: [
            {
              label: divLabel,
              children: [{ label: spanLabel, icon: textIcon }],
            },
          ],
        },
        { label: spanLabel, icon: textIcon },
        {
          label: divLabel,
          children: [
            {
              label: divLabel,
              children: [{ label: divLabel }],
            },
          ],
        },
        {
          label: divLabel,
          open: true,
        },
        { label: divLabel },
        { label: divLabel },
      ],
    },
  ]);

  return (
    <ReactTreeList
      data={data}
      selectedId={selectedId}
      onSelected={(item) => {
        setSelectedId(item.id ?? undefined);
      }}
      onChange={setData}
      itemOptions={{
        focusedOutlineColor: rgba("red", 0.5),
        focusedOutlineWidth: 1,
        focusedBorderRadius: 50,
        focusedBackgroundColor: rgba("red", 0.1),
      }}
      itemDefaults={{
        open: false,
        arrow: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
        icon: blockIcon,
      }}
    />
  );
};
