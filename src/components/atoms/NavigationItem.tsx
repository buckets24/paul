import { ButtonProps } from '@chakra-ui/react';
import BaseNavigationItem from 'jexity-app/layout/common/BaseNavigationItem';
import isActiveLink from 'jexity-app/utils/isActiveLink';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface ActiveProps {
  activeColor?: ButtonProps['color'];
  activeBgColor?: ButtonProps['bgColor'];
  _active?: ButtonProps['_active'];
  _hover?: ButtonProps['_hover'];
}

export interface NavigationItemProps extends ButtonProps {
  href: string;
  activeProps: ActiveProps;
  exact?: boolean;
}

const NavigationItem: FC<NavigationItemProps> = ({ children, href, activeProps, exact = true, ...others }) => {
  const router = useRouter();

  const { activeColor, activeBgColor, ...rest } = activeProps;

  const isActive = isActiveLink(router, href, exact);

  return (
    <BaseNavigationItem
      bg={isActive ? activeBgColor : 'none'}
      color={isActive ? activeColor : 'white'}
      href={href}
      {...rest}
      {...others}
    >
      {children}
    </BaseNavigationItem>
  );
};

export default NavigationItem;
