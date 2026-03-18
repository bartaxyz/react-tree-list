import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import React, { useState } from "react";
import { ReactTreeList } from "../src";
import type { ReactTreeListItemType } from "../src";
import { getRandomEmoji } from "./utils/getRandomEmoji";

// ─── Sample data ─────────────────────────────────────────────────────────────

const flatData: ReactTreeListItemType[] = [
  { id: "1", label: "Dashboard" },
  { id: "2", label: "Projects" },
  { id: "3", label: "Tasks" },
  { id: "4", label: "Messages" },
  { id: "5", label: "Settings" },
];

const nestedData: ReactTreeListItemType[] = [
  {
    id: "1",
    label: "Design",
    open: true,
    children: [
      { id: "1-1", label: "Colors" },
      { id: "1-2", label: "Typography" },
      {
        id: "1-3",
        label: "Icons",
        open: true,
        children: [
          { id: "1-3-1", label: "Outlined" },
          { id: "1-3-2", label: "Filled" },
        ],
      },
    ],
  },
  {
    id: "2",
    label: "Development",
    open: true,
    children: [
      { id: "2-1", label: "Frontend" },
      { id: "2-2", label: "Backend" },
      { id: "2-3", label: "DevOps" },
    ],
  },
  {
    id: "3",
    label: "Testing",
    children: [
      { id: "3-1", label: "Unit Tests" },
      { id: "3-2", label: "Integration" },
    ],
  },
];

const emojiData: ReactTreeListItemType[] = [
  {
    id: "1",
    label: "Animals",
    open: true,
    icon: "🐾",
    children: [
      { id: "1-1", label: "Dog", icon: getRandomEmoji() },
      { id: "1-2", label: "Cat", icon: getRandomEmoji() },
      {
        id: "1-3",
        label: "Birds",
        open: true,
        icon: getRandomEmoji(),
        children: [
          { id: "1-3-1", label: "Parrot", icon: getRandomEmoji() },
          { id: "1-3-2", label: "Owl", icon: getRandomEmoji() },
        ],
      },
    ],
  },
  {
    id: "2",
    label: "Food",
    open: true,
    icon: "🍽️",
    children: [
      { id: "2-1", label: "Pizza", icon: getRandomEmoji() },
      { id: "2-2", label: "Sushi", icon: getRandomEmoji() },
      { id: "2-3", label: "Tacos", icon: getRandomEmoji() },
    ],
  },
  {
    id: "3",
    label: "Sports",
    icon: "🏆",
    children: [
      { id: "3-1", label: "Football", icon: getRandomEmoji() },
      { id: "3-2", label: "Basketball", icon: getRandomEmoji() },
    ],
  },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof ReactTreeList> = {
  title: "ReactTreeList",
  component: ReactTreeList,
  parameters: {
    layout: "padded",
  },
  args: {
    draggable: true,
    onSelected: fn(),
    onDrop: fn(),
    onChange: fn(),
  },
  argTypes: {
    draggable: {
      control: "boolean",
      description: "Enable drag-and-drop reordering",
    },
    data: { table: { disable: true } },
    onChange: { table: { disable: true } },
    selectedId: { table: { disable: true } },
    itemDefaults: { table: { disable: true } },
    itemOptions: { table: { disable: true } },
  },
};

export default meta;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Flat: StoryObj<typeof ReactTreeList> = {
  render: (args) => {
    const [data, setData] = useState(flatData);
    return (
      <ReactTreeList
        {...args}
        data={data}
        onChange={(updated) => {
          setData(updated);
          args.onChange(updated);
        }}
      />
    );
  },
};

export const Nested: StoryObj<typeof ReactTreeList> = {
  render: (args) => {
    const [data, setData] = useState(nestedData);
    return (
      <ReactTreeList
        {...args}
        data={data}
        onChange={(updated) => {
          setData(updated);
          args.onChange(updated);
        }}
        itemDefaults={{ arrow: "▸" }}
      />
    );
  },
};

export const WithEmojis: StoryObj<typeof ReactTreeList> = {
  render: (args) => {
    const [data, setData] = useState(emojiData);
    return (
      <ReactTreeList
        {...args}
        data={data}
        onChange={(updated) => {
          setData(updated);
          args.onChange(updated);
        }}
        itemDefaults={{ open: false, arrow: "▸", icon: getRandomEmoji() }}
      />
    );
  },
};

// Custom args type for the styling story so controls map to itemOptions fields
type CustomStyleArgs = {
  draggable: boolean;
  focusedOutlineColor: string;
  focusedOutlineWidth: number;
  focusedBorderRadius: number;
  focusedBackgroundColor: string;
  arrow: string;
  onSelected: (...args: unknown[]) => void;
  onDrop: (...args: unknown[]) => void;
  onChange: (...args: unknown[]) => void;
};

export const CustomStyles: StoryObj<CustomStyleArgs> = {
  args: {
    draggable: true,
    focusedOutlineColor: "rgba(255, 0, 0, 0.5)",
    focusedOutlineWidth: 1,
    focusedBorderRadius: 50,
    focusedBackgroundColor: "rgba(255, 0, 0, 0.1)",
    arrow: "▸",
  },
  argTypes: {
    draggable: { control: "boolean" },
    focusedOutlineColor: {
      control: "color",
      description: "Color of the focus outline",
    },
    focusedOutlineWidth: {
      control: { type: "range", min: 0, max: 8, step: 1 },
      description: "Width of the focus outline in px",
    },
    focusedBorderRadius: {
      control: { type: "range", min: 0, max: 50, step: 1 },
      description: "Border radius of the focused item in px",
    },
    focusedBackgroundColor: {
      control: "color",
      description: "Background color of the focused item",
    },
    arrow: {
      control: "text",
      description: "Arrow character for items with children",
    },
  },
  render: ({
    draggable,
    focusedOutlineColor,
    focusedOutlineWidth,
    focusedBorderRadius,
    focusedBackgroundColor,
    arrow,
    onSelected,
    onDrop,
    onChange,
  }) => {
    const [data, setData] = useState(nestedData);
    return (
      <ReactTreeList
        draggable={draggable}
        data={data}
        onChange={(updated) => {
          setData(updated);
          onChange(updated);
        }}
        onSelected={onSelected as (item: ReactTreeListItemType) => void}
        onDrop={onDrop as (...args: unknown[]) => void}
        itemDefaults={{ open: true, arrow }}
        itemOptions={{
          focusedOutlineColor,
          focusedOutlineWidth,
          focusedBorderRadius,
          focusedBackgroundColor,
        }}
      />
    );
  },
};
