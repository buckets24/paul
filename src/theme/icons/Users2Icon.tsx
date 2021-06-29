import { Icon, IconProps } from '@chakra-ui/react';
import { FC } from 'react';

export const Users2Icon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon w="16" h="14" viewBox="0 0 16 14" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.5 7C6.8739 7 8.13014 7.51292 9.09409 8.36095C9.6809 8.12847 10.3248 8 11 8C13.7614 8 16 10.149 16 12.8C16 13.4627 15.4404 14 14.75 14L1.375 14C0.615608 14 0 13.3732 0 12.6C0 9.50721 2.46243 7 5.5 7ZM5 0C6.65685 0 8 1.34315 8 3C8 4.65685 6.65685 6 5 6C3.34315 6 2 4.65685 2 3C2 1.34315 3.34315 0 5 0ZM12 2C13.1046 2 14 2.89543 14 4C14 5.10457 13.1046 6 12 6C10.8954 6 10 5.10457 10 4C10 2.89543 10.8954 2 12 2Z"
      fill="currentColor"
    />
  </Icon>
);
