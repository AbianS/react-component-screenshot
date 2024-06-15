import React from 'react';
import { ReactNode, useEffect } from 'react';

export const WrapperComponent = ({
  children,
  onRender
}: {
  children: ReactNode;
  onRender: () => void;
}) => {
  useEffect(() => {
    onRender();
  }, [onRender]);

  return <>{children}</>;
};
