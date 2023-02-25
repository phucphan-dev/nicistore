import React from 'react';

interface ExampleProps {
  children?: React.ReactNode;
}

const Example: React.FC<ExampleProps> = ({ children }) => (
  <div>{children}</div>
);

Example.defaultProps = {
  children: undefined,
};

export default Example;
