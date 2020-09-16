# React Tree List

![Node.js CI](https://github.com/bartaxyz/react-tree-list/workflows/Node.js%20CI/badge.svg)

A draggable & sortable tree list UI component for React.

| <img src="assets/react-tree-list-showcase.gif" alt="React Tree List Component Showcase" width="400" height="318" /> |
| --- |

[Demo](bartaxyz.github.io/react-tree-list/) &nbsp;&middot;&nbsp; [See Features](https://github.com/bartaxyz/react-tree-list/projects) &nbsp;&middot;&nbsp; [Request Feature](https://github.com/bartaxyz/react-tree-list/issues)

## Usage

### Installation with NPM

```bash
npm install @bartaxyz/react-tree-list
```

This package additionaly requires you having `react` and `react-dom` dependencies.

### Importing

You can import the component directly as `ReactTreeList`

```js
import { ReactTreeList } from '@bartaxyz/react-tree-list';
```

#### Typescript

For Typescript the imports additionaly include types like `ReactTreeListProps` which is a type of properties for `ReactTreeList` component.

```ts
import { ReactTreeList, ReactTreeListProps } from '@bartaxyz/react-tree-list';
```


### Simple Example

This is a simple implementation with some items (one nested item) and defaults for each of the items.

```tsx
import React, { useState } from 'react';
import { ReactTreeList } from '@bartaxyz/react-tree-list';


const Component = () => {
  const [data, setData] = useState([
    {
      label: 'Item #1',
      open: true,
      children: [{ label: 'Item #2' }],
    },
    {
      label: 'Item #3',
    },
  ]);
  
  const onTreeListChange = (data) => {
    setData(data);
  }
  
  return (
    <ReactTreeList
      data={data}
      onChange={onTreeListChange}
      itemDefaults={{ open: false, arrow: "▸" }}
    />
  );
}
```

### [See Advanced Examples](bartaxyz.github.io/react-tree-list)

## Author

**Ondřej Bárta**

Twitter: [@bartaxyz](https://www.twitter.com/bartaxyz)
