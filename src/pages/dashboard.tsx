import { Heading, Stack } from '@chakra-ui/react';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import React, { FC } from 'react';
import { getLayout } from 'src/views/common/Layout';

const Dashboard: FC & HasLayout = () => {
  // Commenting out for now until Mandaten search is implemented
  // const [globalFilter, setGlobalFilter] = useState<string>('');

  return (
    <Stack p={6}>
      <Heading
        as="h3"
        color="brand.textColor"
        fontFamily="heading"
        fontWeight="bold"
        fontSize={['xl', null, null, '2xl']}
        mb={4}
      >
        Willkommen Max Müller
      </Heading>
    </Stack>
  );
};

Dashboard.getLayout = getLayout;
export default Dashboard;
