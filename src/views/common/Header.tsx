import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Icon,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { signOut } from 'next-auth/client';
import React, { FC, useRef, useState } from 'react';
import NavigationItem from 'src/components/atoms/NavigationItem';
import { BurgerIcon } from 'src/theme/icons/BurgerIcon';
import { LogoutIcon } from 'src/theme/icons/LogoutIcon';
import { LogoWithText } from 'src/theme/icons/LogoWithText';
import { NotificationIcon } from 'src/theme/icons/NotificationIcon';

import { HEADER_NAV_ITEMS, HeaderNavItem } from './headerNavItems';

const Header: FC = () => {
  return (
    <SimpleGrid pos="relative" templateColumns="280px 1fr" alignItems="center" bg="brand.primary.800" h="100%" w="100%">
      <SimpleGrid templateColumns="1fr max-content" bg="brand.primary.800" h="100%" alignItems="center" pl={4}>
        <Box>
          <NextLink href="/dashboard">
            <Link>
              <LogoWithText height={8} />
            </Link>
          </NextLink>
        </Box>
        <Button
          p={0}
          variant="ghost"
          bg="brand.primary.600"
          borderRadius="50%"
          h="30px"
          mr="-15px"
          minW="30px"
          _hover={{
            bg: 'brand.primary.700',
          }}
        >
          <BurgerIcon color="white" w="1rem" h="1rem" />
        </Button>
      </SimpleGrid>
      <Flex
        bg="brand.primary.900"
        h="100%"
        alignItems="center"
        justifyContent="space-between"
        pr={5}
        pl={[6, 6, 6, 6, '3.5rem']}
      >
        <DesktopNav />
        <Flex alignItems="center">
          <Box mr={[null, null, 2, 8]}>
            <Link
              p={2}
              height={6}
              href={'#'}
              fontSize={'md'}
              fontWeight={600}
              color="white"
              _hover={{
                textDecoration: 'none',
              }}
              _focus={{
                outline: 'none',
              }}
            >
              Max Müller
              <ChevronDownIcon w={6} h={6} />
            </Link>
          </Box>
          <Box mr={[null, null, 2, 8]}>
            <Button
              p={0}
              variant="ghost"
              _hover={{
                bg: 'brand.primary.900',
              }}
              _focus={{
                outline: 'none',
              }}
            >
              <NotificationIcon />
            </Button>
          </Box>
          <Button
            p={0}
            variant="ghost"
            _hover={{
              bg: 'brand.primary.900',
            }}
            _focus={{
              outline: 'none',
            }}
            onClick={async (e) => {
              e.preventDefault();
              await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/login` });
            }}
          >
            <LogoutIcon />
          </Button>
        </Flex>
      </Flex>
    </SimpleGrid>
  );
};

interface PopoverMenuProps {
  navItem: HeaderNavItem;
}

export const headerActiveProps = {
  activeBgColor: 'brand.primary.600',
  _hover: {
    color: 'brand.primary.600',
  },
};

const PopoverMenu: FC<PopoverMenuProps> = ({ navItem }) => {
  const navRef = useRef<HTMLDivElement>(null);

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const togglePopover = () => setIsPopoverOpen(!isPopoverOpen);

  return (
    <Flex key={navItem.label} h={'100%'} alignItems="center" ref={navRef} ml={'0 !important'}>
      <Popover
        placement={'bottom-start'}
        gutter={0}
        isOpen={isPopoverOpen}
        returnFocusOnClose={false}
        onClose={() => setIsPopoverOpen(false)}
      >
        <PopoverTrigger>
          <NavigationItem
            activeProps={headerActiveProps}
            exact={false}
            px={6}
            py={2}
            href={navItem.href}
            borderRadius={0}
            color="white"
            height={'100%'}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              if (!navItem.children) {
                return;
              }
              e.preventDefault();
              togglePopover();
            }}
            _hover={{
              textDecoration: 'none',
              bg: 'brand.primary.600',
            }}
          >
            {navItem.leftIcon || undefined}
            <Text display={['none', 'none', 'none', 'none', 'block']}>{navItem.label}</Text>
            {navItem.children && <Icon color="white" w={6} h={6} as={ChevronDownIcon} />}
          </NavigationItem>
        </PopoverTrigger>

        {navItem.children && (
          <PopoverContent
            bg={'brand.primary.800'}
            border={0}
            borderRadius={0}
            transform={`translate(${navRef.current?.getBoundingClientRect().left}px, 64px) !important`}
            _focus={{
              outline: 'none',
            }}
          >
            <Stack>
              {navItem.children.map((child: HeaderNavItem, index: number) => (
                <DesktopSubNav key={child.label} lastIndex={navItem.children?.length === index + 1} {...child} />
              ))}
            </Stack>
          </PopoverContent>
        )}
      </Popover>
    </Flex>
  );
};

const DesktopNav: FC = () => {
  return (
    <Stack direction={'row'} spacing={4} h={'100%'} alignItems="center">
      {HEADER_NAV_ITEMS.map((navItem: HeaderNavItem) => (
        <PopoverMenu navItem={navItem} key={navItem.label} />
      ))}
    </Stack>
  );
};

const DesktopSubNav: FC<HeaderNavItem> = ({ href, lastIndex, label, leftIcon }) => {
  return (
    <NextLink href={href}>
      <Link
        p={'.5rem'}
        mt={'0 !important'}
        role={'group'}
        borderBottom={`${!lastIndex && '1px solid'}`}
        borderColor={'brand.primary.900'}
        display={'block'}
        _hover={{
          textDecoration: 'none',
          bg: 'brand.primary.600',
        }}
        _focus={{
          outline: 'none',
        }}
      >
        <Text d="flex" alignItems="center" color="white" fontSize={'md'} fontWeight={600}>
          {leftIcon || undefined}
          {label}
        </Text>
      </Link>
    </NextLink>
  );
};

export default Header;
