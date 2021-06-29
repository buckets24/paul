import { Heading, Stack } from '@chakra-ui/react';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import React, { FC } from 'react';
import { getToolsLayout } from 'src/views/tools/ToolsLayout';

const ZeiterfassungPage: FC & HasLayout = () => {
  return (
    <Stack p={6}>
      <Heading
        as="h1"
        color="brand.textColor"
        fontFamily="heading"
        fontWeight="bold"
        fontSize={['2xl', 'null', 'null', 'null', '4xl']}
        mb={4}
      >
        Zeiterfassung
      </Heading>
    </Stack>
  );
};

ZeiterfassungPage.getLayout = getToolsLayout;

export default ZeiterfassungPage;
