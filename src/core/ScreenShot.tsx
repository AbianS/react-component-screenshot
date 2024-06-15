import { useEffect, useRef } from 'react';
import { ScreenShotController } from './Controller';
import React from 'react';

type Props = {
  controller: ScreenShotController;
  children: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

export function ScreenShot({ children, controller, ref: _, ...attributes }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    controller.node = ref.current;
  }, [controller]);

  return (
    <div ref={ref} {...attributes}>
      {children}
    </div>
  );
}
