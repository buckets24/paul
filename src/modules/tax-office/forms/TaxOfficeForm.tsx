import { Box, Grid, Heading } from '@chakra-ui/react';
import { TaxOffice } from '@prisma/client';
import Card from 'jexity-app/card/Card';
import { RadioFormikField } from 'jexity-app/form/fields/RadioField';
import { StringFormikField } from 'jexity-app/form/fields/StringField';
import { FormGridLayout } from 'jexity-app/form/FormGridLayout';
import { SpecialFormikContext, SpecialFormikContextProvider } from 'jexity-app/form/useFormikByName';
import FormActionsContainer from 'jexity-app/layout/FormActionsContainer';
import { useRouter } from 'next/router';
import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import { useContext, useContextSelector } from 'use-context-selector';

import useCreateTaxOfficeMutation from '../query-hooks/useCreateTaxOfficeMutation';
import useUpdateTaxOfficeMutation from '../query-hooks/useUpdateTaxOfficeMutation';
import TaxOfficeFormActions from './TaxOfficeFormActions';
import { TaxOfficeFormFields, taxOfficeFormFieldsFormYupSchema } from './TaxOfficeFormSchema';

export const TaxOfficeFormContent: FC<{ taxOffice?: TaxOffice | null }> = memo(({ taxOffice }) => {
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
        columns={[1, null, null, 1]}
        spacingX={4}
        fields={[
          <StringFormikField key="name" name="name" label="Finanzamt" />,
          <StringFormikField key="address" name="address" label="Straße Hausnummer" />,
          [
            <StringFormikField key="postcode" name="postcode" label="PLZ" type="number" />,
            <StringFormikField key="place" name="place" label="Ort" />,
          ],
          <StringFormikField key="poBox" name="poBox" label="Postfach" />,
          <StringFormikField key="postcodePoBox" name="postcodePoBox" label="PLZ Postfac" />,
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
        <TaxOfficeFormActions formikBag={formikBag} isValid={isValid} taxOffice={taxOffice} />
      </FormActionsContainer>
    </form>
  );
});

export interface TaxOfficeFormProps {
  taxOffice?: TaxOffice | null;
}

const TaxOfficeForm: FC<TaxOfficeFormProps> = ({ taxOffice }) => {
  const router = useRouter();

  const initialValues = useMemo<TaxOfficeFormFields>(
    () => ({
      name: taxOffice?.name || '',
      address: taxOffice?.address || '',
      postcode: taxOffice?.postcode || 0,
      place: taxOffice?.place || '',
      poBox: taxOffice?.poBox || '',
      postcodePoBox: taxOffice?.postcodePoBox || '',
      active: taxOffice?.active ? 'Ja' : 'Nein',
    }),
    [taxOffice]
  );

  const createTaxOfficeMutation = useCreateTaxOfficeMutation();
  const updateTaxOfficeMutation = useUpdateTaxOfficeMutation();

  return (
    <Grid gridTemplateColumns={['1fr', null, null, null, '1fr 1fr 1fr']} gap={5}>
      <Card border="1px solid" borderColor="gray.200" borderRadius="none" boxShadow="none">
        <Heading as="h3" size="md" p={6} pb={3} d="flex" justifyContent="space-between">
          {taxOffice ? 'Bearbeiten' : 'Erstellen'}
        </Heading>
        <Box>
          <SpecialFormikContextProvider<TaxOfficeFormFields>
            initialValues={initialValues}
            validationSchema={taxOfficeFormFieldsFormYupSchema}
            onSubmit={async (values, { setSubmitting }) => {
              if (!taxOffice) {
                await createTaxOfficeMutation.mutateAsync(values);
              } else {
                await updateTaxOfficeMutation.mutateAsync({
                  ...values,
                  id: taxOffice.id,
                });
              }

              setSubmitting(false);
              void router.push('/einstellungen/finanzamt');
            }}
          >
            <TaxOfficeFormContent taxOffice={taxOffice} />
          </SpecialFormikContextProvider>
        </Box>
      </Card>
    </Grid>
  );
};

export default TaxOfficeForm;
