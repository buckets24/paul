import { Heading, Stack } from '@chakra-ui/react';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import React, { FC } from 'react';
import { getAuswertungenLayout } from 'src/views/auswertungen/AuswertungenLayout';

const DirectHoldingsPage: FC & HasLayout = () => {
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
        Unmittelbare Beteiligungen
      </Heading>
    </Stack>
  );
};

DirectHoldingsPage.getLayout = getAuswertungenLayout;

export default DirectHoldingsPage;
