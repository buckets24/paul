import { Icon, IconProps } from '@chakra-ui/react';
import { FC } from 'react';

export const UserAddIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => {
  return (
    <Icon viewBox="0 0 20 20" w="20px" h="20px" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.75 10L8.67612 10.0998C7.93601 11.1267 7.5 12.3875 7.5 13.75C7.5 15.1577 7.96538 16.4567 8.75067 17.5015L3.75 17.5C3.05964 17.5 2.5 16.9404 2.5 16.25C2.5 12.8891 5.15288 10.1477 8.47889 10.0058L8.75 10ZM13.75 10C14.4404 10 15 10.5596 15 11.25V12.5H16.25C16.9404 12.5 17.5 13.0596 17.5 13.75C17.5 14.4404 16.9404 15 16.25 15H15V16.25C15 16.9404 14.4404 17.5 13.75 17.5C13.0596 17.5 12.5 16.9404 12.5 16.25V15H11.25C10.5596 15 10 14.4404 10 13.75C10 13.0596 10.5596 12.5 11.25 12.5H12.5V11.25C12.5 10.5596 13.0596 10 13.75 10ZM10 2.5C12.0711 2.5 13.75 4.17893 13.75 6.25C13.75 6.6901 13.6742 7.1125 13.5349 7.50484L13.75 7.5C11.7834 7.5 10.029 8.40828 8.8833 9.82822C7.35714 9.35505 6.25 7.93182 6.25 6.25C6.25 4.17893 7.92893 2.5 10 2.5Z"
        fill="white"
      />
    </Icon>
  );
};
