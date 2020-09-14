import { addons } from "@storybook/addons";
import { create } from "@storybook/theming/create";

const Theme = create({
  base: "light",
  brandTitle: "@bartaxyz/react-tree-list",

  colorPrimary: "white",
  colorSecondary: "#222",

  // UI
  appBg: "rgba(0, 0, 0, 0.025)",
  appContentBg: "white",
  appBorderColor: "rgba(0, 0, 0, 0.1)",
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: "monospace",

  // Text colors
  textColor: "#222",
  textInverseColor: "rgba(255,255,255,0.9)",

  // Toolbar default and active colors
  barTextColor: "silver",
  barSelectedColor: "#222",
  barBg: "white",

  // Form colors
  inputBg: "white",
  inputBorder: "silver",
  inputTextColor: "#222",
  inputBorderRadius: 4,
});

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: "bottom",
  sidebarAnimations: true,
  enableShortcuts: true,
  isToolshown: true,
  theme: Theme,
  selectedPanel: undefined,
  initialActive: "sidebar",
  showRoots: false,
});
