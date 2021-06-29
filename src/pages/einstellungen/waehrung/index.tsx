import { Heading, Stack } from '@chakra-ui/react';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import React, { FC } from 'react';
import { getEinstellungenLayout } from 'src/views/einstellungen/EinstellungenLayout';

const WaehrungPage: FC & HasLayout = () => {
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
        Währung
      </Heading>
    </Stack>
  );
};

WaehrungPage.getLayout = getEinstellungenLayout;

export default WaehrungPage;
