import { Icon, IconProps } from '@chakra-ui/react';
import { FC } from 'react';

export const VisibleIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 24 24" w="24px" h="24px" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 4C15.5878 4 18.7554 6.43241 21.5113 11.1435L21.7172 11.5011L22 12L21.5113 12.8565C18.7554 17.5676 15.5878 20 12 20C8.41215 20 5.24464 17.5676 2.48874 12.8565L2.28282 12.4989L2 12L2.28282 11.5011C5.08652 6.55556 8.32245 4 12 4ZM12 6C9.29692 6 6.72829 7.91554 4.30532 12C6.72829 16.0845 9.29692 18 12 18C14.6297 18 17.1289 16.1901 19.487 12.3447L19.6948 12.0001L19.4867 11.6553C17.1249 7.80768 14.6259 6 12 6ZM12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9Z"
      fill="#121212"
    />
  </Icon>
);