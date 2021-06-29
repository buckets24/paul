import { Box, BoxProps, Text } from '@chakra-ui/react';
import { FC } from 'react';

interface SidebarProps extends BoxProps {
  textProps?: string;
}

const Sidebar: FC<SidebarProps> = ({ children, textProps, ...boxProps }) => {
  return (
    <Box d="grid" gridTemplateRows="min-content 1fr min-content" h="100%" w="100%" {...boxProps}>
      <Box>{children}</Box>
      <Text mt="auto" pl={10} pb={3} fontFamily="heading" color="gray.100" fontSize="sm">
        © {textProps} {new Date().getFullYear()}
      </Text>
    </Box>
  );
};

export default Sidebar;
