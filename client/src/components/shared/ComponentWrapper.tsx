import { debounce } from 'lodash';
import React from 'react';

type ComponentWrapperProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export const ComponentWrapper: React.FC<ComponentWrapperProps> = ({
  onClick,
  children,
  ...restProps
}: React.PropsWithChildren<ComponentWrapperProps & Pick<ComponentWrapperProps, 'onClick'>>): React.JSX.Element => {
  return (
    <div {...restProps} onClick={onClick && debounce(onClick)}>
      {children}
    </div>
  );
};
