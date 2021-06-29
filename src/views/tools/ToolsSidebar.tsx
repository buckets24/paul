import { Text } from '@chakra-ui/react';
import NavigationBlock from 'jexity-app/layout/sidebar/NavigationBlock';
import React, { FC } from 'react';
import NavigationItem from 'src/components/atoms/NavigationItem';

import Sidebar, { sidebarActiveProps } from '../common/Sidebar';
import { TOOLS_NAV_ITEMS } from './toolsNavItems';

const ToolsSidebar: FC = () => {
  return (
    <Sidebar>
      <NavigationBlock mt={6} mx={6}>
        <Text fontSize="sm" color="white.72" mb={6} px={0} d="flex" alignItems="center">
          Tools
        </Text>

        {TOOLS_NAV_ITEMS.map((toolsNavItem) => (
          <>
            <NavigationItem
              activeProps={sidebarActiveProps}
              href={toolsNavItem.href}
              mb={6}
              px={0}
              leftIcon={toolsNavItem.leftIcon}
            >
              {toolsNavItem.label}
            </NavigationItem>
          </>
        ))}
      </NavigationBlock>
    </Sidebar>
  );
};

export default ToolsSidebar;
