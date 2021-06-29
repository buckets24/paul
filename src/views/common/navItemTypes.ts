import { ReactElement } from 'react';

export interface NavItem {
  href: string;
  label: string;
  leftIcon?: ReactElement;
}

export interface NavItemGroup extends NavItem {
  children?: NavItem[];
}
