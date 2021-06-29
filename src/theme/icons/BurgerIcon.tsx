import { Icon, IconProps } from '@chakra-ui/react';
import { FC } from 'react';

export const BurgerIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon w="16" h="16" viewBox="0 0 16 16" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13 11C13.5523 11 14 11.4477 14 12C14 12.5523 13.5523 13 13 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H13ZM13 7C13.5523 7 14 7.44772 14 8C14 8.55228 13.5523 9 13 9H3C2.44772 9 2 8.55228 2 8C2 7.44772 2.44772 7 3 7H13ZM13 3C13.5523 3 14 3.44772 14 4C14 4.55228 13.5523 5 13 5H3C2.44772 5 2 4.55228 2 4C2 3.44772 2.44772 3 3 3H13Z"
      fill="white"
    />
  </Icon>
);
