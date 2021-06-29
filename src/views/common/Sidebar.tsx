import { Text } from '@chakra-ui/react';
import NavigationBlock from 'jexity-app/layout/sidebar/NavigationBlock';
import JexitySidebar from 'jexity-app/layout/sidebar/Sidebar';
import React, { FC } from 'react';
import NavigationItem from 'src/components/atoms/NavigationItem';
import { StarEmptyIcon } from 'src/theme/icons/StarEmptyIcon';
import { TimeIcon } from 'src/theme/icons/TimeIcon';

export const sidebarActiveProps = {
  activeColor: 'brand.primary.600',
  _hover: {
    color: 'brand.primary.600',
  },
};

const DefaultSidebar: FC = () => {
  return (
    <>
      <NavigationBlock mt={6} mx={6}>
        <Text fontSize="sm" color="white" mb={4} d="flex" alignItems="center">
          <TimeIcon w="1rem" h="1rem" mr={'6px'} />
          Letzte suche
        </Text>
        <NavigationItem activeProps={sidebarActiveProps} exact={false} href="/#!" mb={6} px={0}>
          Curatax Treuhand GmbH
        </NavigationItem>
        <NavigationItem activeProps={sidebarActiveProps} exact={false} href="/#!" mb={6} px={0}>
          KG MARCO POLO Grund Gmbh
        </NavigationItem>
        <NavigationItem activeProps={sidebarActiveProps} exact={false} href="/#!" mb={6} px={0}>
          BOPC Publishing GmbH
        </NavigationItem>
        <NavigationItem activeProps={sidebarActiveProps} exact={false} href="/#!" mb={6} px={0}>
          Digital Mountain GmbH
        </NavigationItem>
      </NavigationBlock>
      <NavigationBlock mt={6} mx={6}>
        <Text fontSize="sm" color="white" mb={4} d="flex" alignItems="center">
          <StarEmptyIcon w="1rem" h="1rem" mr={'6px'} />
          Favoriten
        </Text>
        <NavigationItem activeProps={sidebarActiveProps} exact={false} href="/#!" mb={6} px={0}>
          Curatax Treuhand GmbH
        </NavigationItem>
        <NavigationItem activeProps={sidebarActiveProps} exact={false} href="/#!" mb={6} px={0}>
          KG MARCO POLO Grund Gmbh
        </NavigationItem>
        <NavigationItem activeProps={sidebarActiveProps} exact={false} href="/#!" mb={6} px={0}>
          BOPC Publishing GmbH
        </NavigationItem>
        <NavigationItem activeProps={sidebarActiveProps} exact={false} href="/#!" mb={6} px={0}>
          Digital Mountain GmbH
        </NavigationItem>
      </NavigationBlock>
    </>
  );
};

const Sidebar: FC = ({ children }) => {
  return (
    <JexitySidebar bg="brand.primary.800" textProps="PAUL 2.0.">
      {children ?? <DefaultSidebar />}
    </JexitySidebar>
  );
};

export default Sidebar;
