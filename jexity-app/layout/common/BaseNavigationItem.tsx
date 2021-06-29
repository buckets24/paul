import { Button, ButtonProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FC } from 'react';

interface BaseNavProps {
  href: string;
}

export type BaseNavigationItemProps = BaseNavProps & ButtonProps;

const BaseNavigationItem: FC<BaseNavigationItemProps> = ({ children, href, ...buttonProps }) => {
  return (
    <NextLink passHref href={href} as={href}>
      <Button
        as="a"
        fontSize="md"
        fontWeight={600}
        height="auto"
        justifyContent="flex-start"
        role="group"
        variant="ghost"
        w="100%"
        _active={{ bg: 'none' }}
        _focus={{
          outline: 'none',
        }}
        {...buttonProps}
      >
        {children}
      </Button>
    </NextLink>
  );
};
export default BaseNavigationItem;
