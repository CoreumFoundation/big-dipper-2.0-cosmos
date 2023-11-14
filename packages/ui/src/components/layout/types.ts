import { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
  navTitle?: string;
  className?: string;
  contentWrapperClassName?: string;
  rootClassName?: string;
}
