import { Box, BoxProps } from '@chakra-ui/react';
import { FC } from 'react';

type NavigationBlockProps = BoxProps;

const NavigationBlock: FC<NavigationBlockProps> = ({ children, ...boxProps }) => {
  return (
    <Box>
      <Box mt={5} mx={5} {...boxProps}>
        {children}
      </Box>
    </Box>
  );
};

export default NavigationBlock;
