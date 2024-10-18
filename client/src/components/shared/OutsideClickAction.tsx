import React, { useEffect, useRef } from 'react';

type Props = {
  onClickOutSide: () => void;
  children?: React.ReactNode;
};
export const OutsideClickAction: React.FC<Props> = ({ onClickOutSide, children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (ev: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(ev.target as Node)) {
        onClickOutSide();
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [onClickOutSide]);

  return <div ref={wrapperRef}>{children}</div>;
};
