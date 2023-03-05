import React from 'react';

interface SubscribeProps {
    children?: React.ReactNode;
}

const Subscribe: React.FC<SubscribeProps> = ({ children }) => (
    <div>{children}</div>
);

Subscribe.defaultProps = {
  children: undefined,
};

export default Subscribe;
