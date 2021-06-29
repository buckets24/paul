import { Icon, IconProps } from '@chakra-ui/react';
import { FC } from 'react';

export const DocumentIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 16 20" w="16px" h="20px" {...props}>
    <path
      d="M2 0C0.9 0 0.0100002 0.9 0.0100002 2L0 18C0 19.1 0.89 20 1.99 20H14C15.1 20 16 19.1 16 18V6L10 0H2ZM9 7V1.5L14.5 7H9Z"
      fill="#CFA571"
    />
  </Icon>
);
