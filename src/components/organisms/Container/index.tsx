import React from 'react';

interface ContainerProps {
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className="container o-container">{children}</div>
);

Container.defaultProps = {
  children: undefined,
};

export default Container;
