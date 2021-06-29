import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text } from '@chakra-ui/react';
import { TriangleIcon } from 'jexity-app/icons/TriangleIcon';
import React, { FC, useState } from 'react';
import NavigationItem from 'src/components/atoms/NavigationItem';
import { NavItemGroup } from 'src/views/common/navItemTypes';
import { sidebarActiveProps } from 'src/views/common/Sidebar';

interface CollapsibleNavigationProps {
  isAccordionOpen: boolean;
  navItem: NavItemGroup;
}

const CollapsibleNavigation: FC<CollapsibleNavigationProps> = ({ isAccordionOpen, navItem }) => {
  const [isToggled, toggle] = useState<boolean>(isAccordionOpen);

  return (
    <Accordion
      allowToggle
      borderColor="brand.primary.800"
      defaultIndex={isToggled ? [0] : undefined}
      key={navItem.href}
      marginX={-6}
    >
      <AccordionItem borderWidth={0}>
        <AccordionButton
          px={6}
          py={0}
          mb={2}
          _focus={{
            outline: 'none',
          }}
          onClick={() => {
            toggle(!isToggled);
          }}
        >
          <Box width="100%" display="flex" justifyContent="space-between">
            <Box
              color="white"
              display="flex"
              alignItems="center"
              fontWeight="bold"
              fontSize="md"
              _hover={{ color: 'brand.primary.600' }}
            >
              {navItem.leftIcon}
              {navItem.label}
            </Box>
            <AccordionIcon color="white" />
          </Box>
        </AccordionButton>
        {isToggled && (
          <Box bg={'brand.primary.900'} w="100%">
            <TriangleIcon color={'brand.primary.800'} h={20.7} w={32} ml={-7} mt={-5} />
          </Box>
        )}
        {navItem.children?.map((item, idx) => (
          <AccordionPanel key={item.label} color="white" py={2} borderStyle="none" bg="brand.primary.900">
            <NavigationItem
              activeProps={sidebarActiveProps}
              href={item.href}
              mb={navItem.children?.length === idx + 1 ? 4 : 1}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                if (item.href) {
                  return;
                }
                e.preventDefault();
              }}
            >
              <Text fontWeight={600} ml={4} fontSize="md" _hover={{ color: 'brand.primary.600' }}>
                {item.label}
              </Text>
            </NavigationItem>
          </AccordionPanel>
        ))}
      </AccordionItem>
    </Accordion>
  );
};

export default CollapsibleNavigation;
