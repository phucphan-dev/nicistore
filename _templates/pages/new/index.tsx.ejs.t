---
to: src/pages/<%= h.toPascalCase(name) %>/index.tsx
---
import React from 'react';

const <%= h.toPascalCase(name) %>: React.FC = () => (
  <div>Page <%= h.toPascalCase(name) %></div>
);

export default <%= h.toPascalCase(name) %>;
