import { Icon, IconProps } from '@chakra-ui/react';
import { FC } from 'react';

export const FileIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon w="12" h="16" viewBox="0 0 12 16" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 0C7.26522 0 7.51957 0.105357 7.70711 0.292893L11.7071 4.29289C11.8946 4.48043 12 4.73478 12 5L12 13C12 14.6569 10.6569 16 9 16L3 16C1.34315 16 0 14.6569 0 13L0 3C0 1.34315 1.34315 0 3 0L7 0ZM5.999 2L3 2C2.44772 2 2 2.44772 2 3L2 13C2 13.5523 2.44772 14 3 14L9 14C9.55229 14 10 13.5523 10 13L10 6L7 6C6.48716 6 6.06449 5.61396 6.00673 5.11662L6 5L5.999 2Z"
      fill="white"
    />
  </Icon>
);
