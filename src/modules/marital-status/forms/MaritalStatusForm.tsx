import { Box, Grid, Heading } from '@chakra-ui/react';
import { MaritalStatus } from '@prisma/client';
import Card from 'jexity-app/card/Card';
import { RadioFormikField } from 'jexity-app/form/fields/RadioField';
import { StringFormikField } from 'jexity-app/form/fields/StringField';
import { FormGridLayout } from 'jexity-app/form/FormGridLayout';
import { SpecialFormikContext, SpecialFormikContextProvider } from 'jexity-app/form/useFormikByName';
import FormActionsContainer from 'jexity-app/layout/FormActionsContainer';
import { useRouter } from 'next/router';
import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import { useContext, useContextSelector } from 'use-context-selector';

import useCreateMaritalStatusMutation from '../query-hooks/useCreateMaritalStatusMutation';
import useUpdateMaritalStatusMutation from '../query-hooks/useUpdateMaritalStatusMutation';
import { MaritalStatusFormFields, maritalStatusFormYupSchema } from './MaritalStatusFormSchema';
import MaritalStatusManagement from './MaritalStatusManagement';

export const MaritalStatusFormContent: FC<{ maritalStatus?: Partial<MaritalStatus> | null }> = memo(
  ({ maritalStatus }) => {
    const formikBag = useContext(SpecialFormikContext);
    const values = useContextSelector(SpecialFormikContext, (state) => state?.values);
    const formikIsValid = useContextSelector(SpecialFormikContext, (state) => state?.isValid);
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
      if (values && Object.values(values).length > 0) {
        setIsValid(formikIsValid ?? false);
      }
    }, [values, formikIsValid]);

    return (
      <form onSubmit={formikBag?.handleSubmit} noValidate>
        <FormGridLayout
          p={6}
          pt={3}
          columns={1}
          spacingX={4}
          fields={[
            <StringFormikField key="name" name="name" label="Familienstand" isRequired />,
            <RadioFormikField
              direction="row"
              key="active"
              name="active"
              formLabel="Aktiv"
              options={[
                {
                  key: '1',
                  label: 'Ja',
                  value: 'Ja',
                },
                {
                  key: '2',
                  label: 'Nein',
                  value: 'Nein',
                },
              ]}
            />,
          ]}
        />

        <FormActionsContainer>
          <MaritalStatusManagement formikBag={formikBag} isValid={isValid} maritalStatus={maritalStatus} />
        </FormActionsContainer>
      </form>
    );
  }
);

interface FamilienstandFormProps {
  maritalStatus?: Partial<MaritalStatus> | null;
}

// let userEmail: Prisma.UserWhereUniqueInput;

const MaritalStatusForm: FC<FamilienstandFormProps> = ({ maritalStatus }) => {
  const router = useRouter();

  const initialValues = useMemo<MaritalStatusFormFields>(
    () => ({
      name: maritalStatus?.name || '',
      active: maritalStatus?.active ? 'Ja' : 'Nein',
    }),
    [maritalStatus]
  );

  const createMaritalStatusMutation = useCreateMaritalStatusMutation();
  const updateMaritalStatusMutation = useUpdateMaritalStatusMutation();

  return (
    <Grid gridTemplateColumns={['1fr', null, null, null, '1fr 1fr 1fr']} gap={5}>
      <Card border="1px solid" borderColor="gray.200" borderRadius="none" boxShadow="none">
        <Heading as="h3" size="md" p={6} pb={3} d="flex" justifyContent="space-between">
          {maritalStatus ? 'Bearbeiten' : 'Erstellen'}
        </Heading>
        <Box>
          <SpecialFormikContextProvider<MaritalStatusFormFields>
            initialValues={initialValues}
            validationSchema={maritalStatusFormYupSchema}
            onSubmit={async (values, { setSubmitting }) => {
              if (!maritalStatus) {
                await createMaritalStatusMutation.mutateAsync(values);
              } else {
                await updateMaritalStatusMutation.mutateAsync({
                  ...values,
                  id: Number(maritalStatus.id),
                });
              }

              setSubmitting(false);
              void router.push('/einstellungen/familienstand');
            }}
          >
            <MaritalStatusFormContent maritalStatus={maritalStatus} />
          </SpecialFormikContextProvider>
        </Box>
      </Card>
    </Grid>
  );
};

export default MaritalStatusForm;
