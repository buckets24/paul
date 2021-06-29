import { Text } from '@chakra-ui/react';
import NavigationBlock from 'jexity-app/layout/sidebar/NavigationBlock';
import React, { FC } from 'react';
import NavigationItem from 'src/components/atoms/NavigationItem';
import { EnterArrowRightIcon } from 'src/theme/icons/EnterArrowRightIcon';
import { FileIcon } from 'src/theme/icons/FileIcon';
import { FolderAddIcon } from 'src/theme/icons/FolderAddIcon';
import { FolderMinusIcon } from 'src/theme/icons/FolderMinusIcon';

import Sidebar, { sidebarActiveProps } from '../common/Sidebar';

const DocumentsSidebar: FC = () => {
  return (
    <Sidebar>
      <NavigationBlock mt={6} mx={6}>
        <Text fontSize="sm" color="white.72" mb={6} px={0} d="flex" alignItems="center">
          <FileIcon h="1rem" w=".75rem" mr="6px" />
          Dokumente
        </Text>
        <NavigationItem
          activeProps={sidebarActiveProps}
          href="#!"
          mb={4}
          px={0}
          leftIcon={<FolderMinusIcon w="1rem" h="1rem" />}
        >
          2000
        </NavigationItem>
        <NavigationItem
          activeProps={sidebarActiveProps}
          href="#!"
          mb={4}
          px={0}
          leftIcon={<EnterArrowRightIcon w="1rem" h="1rem" />}
        >
          Datei 1
        </NavigationItem>
        <NavigationItem
          activeProps={sidebarActiveProps}
          href="#!"
          mb={4}
          px={0}
          leftIcon={<EnterArrowRightIcon w="1rem" h="1rem" />}
        >
          Datei 2
        </NavigationItem>
        <NavigationItem
          activeProps={sidebarActiveProps}
          href="#!"
          mb={4}
          px={0}
          leftIcon={<EnterArrowRightIcon w="1rem" h="1rem" />}
        >
          Datei 3
        </NavigationItem>
        <NavigationItem
          activeProps={sidebarActiveProps}
          href="#!"
          mb={4}
          px={0}
          leftIcon={<FolderAddIcon w="1rem" h="1rem" />}
        >
          2001
        </NavigationItem>
      </NavigationBlock>
    </Sidebar>
  );
};

export default DocumentsSidebar;
