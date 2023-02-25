---
to: src/components/<%= level %>/<%= h.toPascalCase(name) %>/index.tsx
---
import React from 'react';

interface <%= h.toPascalCase(name) %>Props {
    children?: React.ReactNode;
}

const <%= h.toPascalCase(name) %>: React.FC<<%= h.toPascalCase(name) %>Props> = ({ children }) => (
    <div>{children}</div>
);

<%= h.toPascalCase(name) %>.defaultProps = {
  children: undefined,
};

export default <%= h.toPascalCase(name) %>;
