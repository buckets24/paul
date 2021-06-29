import { Box, Button, Grid, ModalFooter, UseDisclosureProps } from '@chakra-ui/react';
import { User } from '@prisma/client';
import { AxiosError, AxiosResponse } from 'axios';
import Card from 'jexity-app/card/Card';
import { StringFormikField } from 'jexity-app/form/fields/StringField';
import { FormGridLayout } from 'jexity-app/form/FormGridLayout';
import { SpecialFormikContext, SpecialFormikContextProvider } from 'jexity-app/form/useFormikByName';
import { WithModalProps } from 'jexity-app/modal/WithModal';
import React, { FC } from 'react';
import { useMutation } from 'react-query';
import { VerifyPasswordYupSchema, verifyPasswordYupSchema } from 'src/modules/common/yupSchemaFields';
import axios from 'src/utils/axios';
import { SimpleError } from 'src/utils/type-utils/SimpleError';
import { useContext } from 'use-context-selector';

import { UpdatePasswordHandlerInput, UpdatePasswordHandlerResponse } from '../handlers/updatePasswordHandler';

interface PasswordFormContentProps {
  disclosure?: UseDisclosureProps;
}

const PasswordFormContent: FC<PasswordFormContentProps> = ({ disclosure }) => {
  const formikBag = useContext(SpecialFormikContext);

  return (
    <form onSubmit={formikBag?.handleSubmit} noValidate>
      <FormGridLayout
        columns={1}
        fields={[
          <StringFormikField key="password" name="password" label="Passwort" type="password" />,
          <StringFormikField key="repeatPassword" name="repeatPassword" label="Passwort bestätigen" type="password" />,
        ]}
      />
      <ModalFooter px={0}>
        <Button
          type="submit"
          bg="brand.primary.600"
          color="white"
          _hover={{
            bg: 'brand.primary.700',
          }}
        >
          Speichern
        </Button>
        <Button
          ml={4}
          variant="outline"
          borderWidth="1px"
          borderColor="brand.primary.600"
          borderRadius="4px"
          color="brand.primary.600"
          _hover={{ bg: 'brand.primary.200' }}
          onClick={disclosure?.onClose}
        >
          Abbrechen
        </Button>
      </ModalFooter>
    </form>
  );
};

interface PasswordFormProps {
  userId: User['id'];
  disclosure?: WithModalProps['disclosure'];
}

const PasswordForm: FC<PasswordFormProps> = ({ userId, disclosure }) => {
  const updatePasswordMutation = useMutation<
    AxiosResponse<UpdatePasswordHandlerResponse>['data'],
    AxiosError<SimpleError>,
    UpdatePasswordHandlerInput
  >(async (input) => {
    const data: VerifyPasswordYupSchema = input;
    const response = await axios.put<UpdatePasswordHandlerResponse>(`/api/users/${userId}/set-password`, data);
    return response.data;
  });

  return (
    <Grid gridTemplateColumns="1fr" gap={5}>
      <Card borderRadius="none" boxShadow="none">
        <Box>
          <SpecialFormikContextProvider<VerifyPasswordYupSchema>
            initialValues={{
              password: '',
              repeatPassword: '',
            }}
            validationSchema={verifyPasswordYupSchema}
            onSubmit={async (values, { setSubmitting }) => {
              await updatePasswordMutation.mutateAsync(values);
              setSubmitting(false);
              disclosure?.onClose();
            }}
          >
            <PasswordFormContent disclosure={disclosure} />
          </SpecialFormikContextProvider>
        </Box>
      </Card>
    </Grid>
  );
};

export default PasswordForm;
