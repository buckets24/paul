import { Text } from '@chakra-ui/react';
import NavigationBlock from 'jexity-app/layout/sidebar/NavigationBlock';
import notEmpty from 'jexity-app/utils/filterEmpty';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import NavigationItem from 'src/components/atoms/NavigationItem';
import CollapsibleNavigation from 'src/components/sidebar/CollapsibleNavigation';

import { NavItemGroup } from '../common/navItemTypes';
import Sidebar, { sidebarActiveProps } from '../common/Sidebar';
import { EINSTELLUNGEN_NAV_ITEMS } from './einstellungenNavItems';

const EinstellungenSidebar: FC = () => {
  const router = useRouter();

  const isAccordionOpen = EINSTELLUNGEN_NAV_ITEMS.map((item: NavItemGroup) => item.children)
    .filter(notEmpty)[0]
    .map((navItem) => navItem.href)
    .includes(`${router.pathname}`);

  return (
    <Sidebar>
      <NavigationBlock mt={6} mx={6}>
        <Text fontSize="sm" color="white.72" mb={6} px={0}>
          Einstellungen
        </Text>
        {EINSTELLUNGEN_NAV_ITEMS.map((navItem) => {
          if (!navItem.children) {
            return (
              <NavigationItem
                activeProps={sidebarActiveProps}
                href={navItem.href}
                key={navItem.href}
                leftIcon={navItem.leftIcon}
                mb={6}
                px={0}
              >
                {navItem.label}
              </NavigationItem>
            );
          }

          if (navItem.children.length) {
            return <CollapsibleNavigation navItem={navItem} isAccordionOpen={isAccordionOpen} />;
          }
        })}
      </NavigationBlock>
    </Sidebar>
  );
};

export default EinstellungenSidebar;
