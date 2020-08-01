import React, { useState } from "react";

import { ReactTreeList, ReactTreeListProps } from "../src";
import { getRandomEmoji } from "./utils/getRandomEmoji";

export default { title: "Tree List" };

export const regular = () => {
  const [data, setData] = useState<ReactTreeListProps["data"]>([
    {
      label: "none",
      open: true,
      icon: getRandomEmoji(),
      children: [
        {
          label: "Heyo",
          open: true,
          children: [{ label: "Heyo", children: [{ label: "Heyo" }] }],
        },
        {
          label: "Heyo",
          children: [
            {
              label: "Heyo",
              children: [
                {
                  label: "Heyo",
                  children: [
                    {
                      label: "Heyo",
                      children: [
                        { label: "Heyo", children: [{ label: "Heyo" }] },
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
          children: [{ label: "Heyo", children: [{ label: "Heyo" }] }],
        },
        {
          label: "Heyo",
          open: true,
          children: [{ label: "Heyo", children: [{ label: "Heyo" }] }],
        },
        {
          label: "Heyo",
          children: [
            {
              label: "Heyo",
              children: [
                {
                  label: "Heyo",
                  children: [
                    {
                      label: "Heyo",
                      children: [
                        { label: "Heyo", children: [{ label: "Heyo" }] },
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
          children: [
            {
              label: "Heyo",
              children: [
                { label: "Heyo" },
                {
                  label: "Heyo",
                  children: [
                    {
                      label: "Heyo",
                      children: [
                        {
                          label: "Heyo",
                          children: [
                            {
                              label: "Heyo",
                              children: [
                                {
                                  label: "Heyo",
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
          children: [{ label: "Heyo", children: [{ label: "Heyo" }] }],
        },
        {
          label: "Heyo",
          children: [
            {
              label: "Heyo",
              children: [
                {
                  label: "Heyo",
                  children: [
                    {
                      label: "Heyo",
                      children: [
                        { label: "Heyo", children: [{ label: "Heyo" }] },
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
          children: [{ label: "Heyo", children: [{ label: "Heyo" }] }],
        },
        {
          label: "Heyo",
          open: true,
          children: [{ label: "Heyo", children: [{ label: "Heyo" }] }],
        },
        {
          label: "Heyo",
          children: [
            {
              label: "Heyo",
              children: [
                {
                  label: "Heyo",
                  children: [
                    {
                      label: "Heyo",
                      children: [
                        { label: "Heyo", children: [{ label: "Heyo" }] },
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
          children: [
            {
              label: "Heyo",
              children: [
                { label: "Heyo" },
                {
                  label: "Heyo",
                  children: [
                    {
                      label: "Heyo",
                      children: [
                        {
                          label: "Heyo",
                          children: [
                            {
                              label: "Heyo",
                              children: [
                                {
                                  label: "Heyo",
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

  return (
    <ReactTreeList
      data={data}
      onChange={setData}
      itemDefaults={{ open: false, arrow: "▸", icon: getRandomEmoji() }}
    />
  );
};
