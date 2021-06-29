import { Icon, IconProps } from '@chakra-ui/react';
import { FC } from 'react';

export const SuitcaseIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon w="16" h="16" viewBox="0 0 16 16" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 0L9 0C10.5977 0 11.9037 1.24892 11.9949 2.82373L12 3L12 4H13C14.6569 4 16 5.34315 16 7L16 13C16 14.6569 14.6569 16 13 16L3 16C1.34315 16 0 14.6569 0 13L0 7C0 5.34315 1.34315 4 3 4H4V3C4 1.40232 5.24892 0.0963391 6.82373 0.00509269L7 0L9 0L7 0ZM14 12L2 12V13C2 13.5523 2.44772 14 3 14L13 14C13.5523 14 14 13.5523 14 13V12ZM13 6L3 6C2.44772 6 2 6.44772 2 7L2 10L14 10V7C14 6.44772 13.5523 6 13 6ZM9 2L7 2C6.48716 2 6.06449 2.38604 6.00673 2.88338L6 3V4L10 4L10 3C10 2.48716 9.61396 2.06449 9.11662 2.00673L9 2Z"
      fill="currentColor"
    />
  </Icon>
);
