import { Icon, IconProps } from '@chakra-ui/react';
import { FC } from 'react';

export const DocumentIncompleteIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 18 18" w="18px" h="18px" {...props}>
    <path
      d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM14 10H4V8H14V10Z"
      fill="#447ACA"
    />
  </Icon>
);
