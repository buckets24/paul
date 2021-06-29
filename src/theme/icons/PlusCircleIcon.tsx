import { Icon, IconProps } from '@chakra-ui/react';
import { FC } from 'react';

export const PlusCircleIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 16 16" w="16px" h="16px" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM8 4C8.55229 4 9 4.44772 9 5V7L11 7C11.5523 7 12 7.44772 12 8C12 8.55229 11.5523 9 11 9L9 9L9 11C9 11.5523 8.55229 12 8 12C7.44772 12 7 11.5523 7 11L7 9H5C4.44772 9 4 8.55229 4 8C4 7.44772 4.44772 7 5 7L7 7L7 5C7 4.44772 7.44772 4 8 4Z"
      fill="currentColor"
    />
  </Icon>
);
