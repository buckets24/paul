import { Spinner as ChakraSpinner } from '@chakra-ui/react';
import React, { FC } from 'react';

const Spinner: FC = () => {
  return (
    <ChakraSpinner
      d="flex"
      m="auto"
      mt={4}
      emptyColor="brand.primary.600"
      color="brand.primary.300"
      thickness="4px"
      size="lg"
    />
  );
};

export default Spinner;
