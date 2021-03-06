import { Icon, IconProps } from '@chakra-ui/react';
import { FC } from 'react';

export const PercentIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon w="20" h="20" viewBox="0 0 20 20" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 11C16.6569 11 18 12.3431 18 14V15C18 16.6569 16.6569 18 15 18H14C12.3431 18 11 16.6569 11 15V14C11 12.3431 12.3431 11 14 11H15ZM15 13H14C13.4477 13 13 13.4477 13 14V15C13 15.5523 13.4477 16 14 16H15C15.5523 16 16 15.5523 16 15V14C16 13.4477 15.5523 13 15 13ZM6 2C7.65685 2 9 3.34315 9 5V6C9 7.65685 7.65685 9 6 9H5C3.34315 9 2 7.65685 2 6V5C2 3.34315 3.34315 2 5 2L6 2ZM6 4H5C4.44772 4 4 4.44772 4 5V6C4 6.55228 4.44772 7 5 7H6C6.55228 7 7 6.55228 7 6V5C7 4.44772 6.55228 4 6 4Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.4707 2.89805C15.9667 2.40207 16.6854 2.31658 17.0759 2.70711C17.4664 3.09763 17.3809 3.81628 16.8849 4.31226L4.31226 16.8849C3.81628 17.3809 3.09763 17.4664 2.70711 17.0759C2.31658 16.6854 2.40207 15.9667 2.89805 15.4707L15.4707 2.89805Z"
      fill="currentColor"
    />
  </Icon>
);
