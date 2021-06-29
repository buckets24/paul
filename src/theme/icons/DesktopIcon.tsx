import { Icon, IconProps } from '@chakra-ui/react';
import { FC } from 'react';

export const DesktopIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon w="16" h="16" viewBox="0 0 16 16" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 12L3 12C1.34315 12 0 10.6569 0 9L0 3C0 1.34315 1.34315 0 3 0L13 0C14.6569 0 16 1.34315 16 3L16 9C16 10.6569 14.6569 12 13 12L9 12V14L11 14C11.5523 14 12 14.4477 12 15C12 15.5523 11.5523 16 11 16L5 16C4.44772 16 4 15.5523 4 15C4 14.4477 4.44772 14 5 14H7L7 12ZM13 2L3 2C2.44772 2 2 2.44772 2 3L2 9C2 9.55229 2.44772 10 3 10L13 10C13.5523 10 14 9.55229 14 9L14 3C14 2.44772 13.5523 2 13 2Z"
      fill="white"
    />
  </Icon>
);
