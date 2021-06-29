import { Box, BoxProps, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import { FC } from 'react';

import { useSidebarStore } from './sidebar/sidebarStore';

interface DashboardSideBarProps extends BoxProps {
  width: string;
  headerHeight?: string;
}

export const DashboardSideBar: FC<DashboardSideBarProps> = ({ width, headerHeight = '0px', children, ...boxProps }) => {
  const { toggleSidebar, setToggleSidebar } = useSidebarStore();
  return (
    <Box gridArea="sidebar" w={[0, null, null, null, width]} h="100%" {...boxProps}>
      <Box d={['none', null, null, null, 'block']} h={`calc(100% - ${headerHeight})`}>
        {children}
      </Box>
      <Box d={['block', null, null, null, 'none']} h="100%">
        <Drawer isOpen={toggleSidebar} placement="left" onClose={() => setToggleSidebar(!toggleSidebar)}>
          <DrawerOverlay zIndex={5}>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody>{children}</DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Box>
    </Box>
  );
};
