import { Box, Flex, FlexProps } from '@chakra-ui/react';
import { FC } from 'react';
import Header from 'src/views/common/Header';

import { FooterLayout } from './FooterLayout';
import { GetLayout } from './layoutApi';

const PublicStaticLayout: FC<FlexProps> = ({ children, ...others }) => (
  <Box overflow="hidden" h="100%">
    <Box w="100%" h="64px">
      <Header />
    </Box>
    <Box overflow="auto" h="calc(100% - 64px)">
      <Flex
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems="flex-start"
        px={[10, null, null, 0]}
        pt="40px"
        pb="1.5rem"
        position="relative"
        minH="100%"
        w="100%"
        bg="gray.200"
        {...others}
      >
        {children}
        <FooterLayout mt="3.5rem" mx="auto" maxW={['100%', null, null, '856px']} minW={['100%', null, null, '856px']} />
      </Flex>
    </Box>
  </Box>
);

export const getPublicStaticLayout: GetLayout = (page) => <PublicStaticLayout>{page}</PublicStaticLayout>;

export default PublicStaticLayout;
