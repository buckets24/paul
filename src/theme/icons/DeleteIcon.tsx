import { Icon, IconProps } from '@chakra-ui/react';
import { FC } from 'react';

export const DeleteIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 20 20" w="20px" h="20px" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 8C15.5523 8 16 8.44772 16 9L16 15C16 16.6569 14.6569 18 13 18H7C5.34315 18 4 16.6569 4 15L4 9C4 8.44772 4.44772 8 5 8L15 8ZM14 10L6 10L6 15C6 15.5523 6.44772 16 7 16H13C13.5523 16 14 15.5523 14 15L14 10ZM7 3C7 2.44772 7.44772 2 8 2L12 2C12.5523 2 13 2.44772 13 3V4L16 4C16.5523 4 17 4.44772 17 5C17 5.55228 16.5523 6 16 6L4 6C3.44772 6 3 5.55228 3 5C3 4.44772 3.44772 4 4 4L7 4L7 3Z"
      fill="currentColor"
    />
  </Icon>
);
