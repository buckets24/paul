import { Text } from '@chakra-ui/react';
import NavigationBlock from 'jexity-app/layout/sidebar/NavigationBlock';
import React, { FC } from 'react';
import NavigationItem from 'src/components/atoms/NavigationItem';

import Sidebar, { sidebarActiveProps } from '../common/Sidebar';
import { AUSWERTUNGEN_NAV_ITEMS } from './auswertungenNavItems';

const AuswertungenSidebar: FC = () => {
  return (
    <Sidebar>
      <NavigationBlock mt={6} mx={6}>
        <Text fontSize="sm" color="white.72" mb={6} px={0}>
          Auswertungen
        </Text>

        {AUSWERTUNGEN_NAV_ITEMS.map((navItem) => (
          <>
            <NavigationItem
              activeProps={sidebarActiveProps}
              href={navItem.href}
              mb={6}
              px={0}
              leftIcon={navItem.leftIcon}
            >
              {navItem.label}
            </NavigationItem>
          </>
        ))}
      </NavigationBlock>
    </Sidebar>
  );
};

export default AuswertungenSidebar;
