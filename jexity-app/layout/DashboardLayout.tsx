import { Box, SimpleGrid } from '@chakra-ui/react';
import { FC, ReactNode, useMemo } from 'react';

import { DashboardSideBar } from './DashboardSideBar';

interface SizeProps {
  headerHeight: string;
  sidebarWidth: string;
}

export interface DashboardLayoutProps {
  header: ReactNode;
  sidebar: ReactNode;
  sizeProps?: SizeProps;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children, header, sidebar, sizeProps }) => {
  const { headerHeight, sidebarWidth } = useMemo(
    () => ({
      headerHeight: sizeProps?.headerHeight ?? '64px',
      sidebarWidth: sizeProps?.sidebarWidth ?? '295px',
    }),
    []
  );

  return (
    <SimpleGrid
      gridTemplateAreas="'header header' 'sidebar content' 'sidebar footer'"
      h="100%"
      gridTemplateColumns="min-content 1fr"
      gridTemplateRows="min-content 1fr"
      overflow="hidden"
      pos="relative"
    >
      <Box gridArea="header" h={headerHeight} w="100%">
        {header}
      </Box>
      <DashboardSideBar width={sidebarWidth}>{sidebar}</DashboardSideBar>
      <Box overflow="auto" gridArea="content">
        {children}
      </Box>
    </SimpleGrid>
  );
};

export default DashboardLayout;
