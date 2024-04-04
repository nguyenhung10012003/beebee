import React from 'react';

const Container = ({ className, children }: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`container p-8 mx-auto xl:px-0 ${
        className ? className : ''
      }`}>
      {children}
    </div>
  );
};

export default Container;