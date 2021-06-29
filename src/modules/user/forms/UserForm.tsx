import { Box, Grid, Heading } from '@chakra-ui/react';
import { Role, Salutation, User } from '@prisma/client';
import Card from 'jexity-app/card/Card';
import { EmailFormikField } from 'jexity-app/form/fields/EmailField';
import { RadioFormikField } from 'jexity-app/form/fields/RadioField';
import { SelectFormikField } from 'jexity-app/form/fields/SelectField';
import { StringFormikField } from 'jexity-app/form/fields/StringField';
import { FormGridLayout } from 'jexity-app/form/FormGridLayout';
import { SpecialFormikContext, SpecialFormikContextProvider } from 'jexity-app/form/useFormikByName';
import FormActionsContainer from 'jexity-app/layout/FormActionsContainer';
import { useRouter } from 'next/router';
import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import { handleEmailOnBlur, handleUsernameOnBlur } from 'src/modules/common/utils';
import { capitalize } from 'src/utils/capitalize';
import { useContext, useContextSelector } from 'use-context-selector';

import useCreateUserMutation from '../query-hooks/useCreateUserMutation';
import useUpdateUserMutation from '../query-hooks/useUpdateUserMutation';
import { UserCreateFormFields, userFormYupSchema } from '../schemas/userFormSchema';
import UserFormActions from './UserFormActions';

export const UserEditFormContent: FC<{ user?: User | null }> = memo(({ user }) => {
  // Check if the authenticated is an agent or admin
  // const me = useAuthStore(getMe);
  // const updateMode = !!user;

  const formikBag = useContext(SpecialFormikContext);
  const values = useContextSelector(SpecialFormikContext, (state) => state?.values);
  const formikIsValid = useContextSelector(SpecialFormikContext, (state) => state?.isValid);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [checkingEmail, setCheckingEmail] = useState<boolean>(false);
  const [checkingUsername, setCheckingUsername] = useState<boolean>(false);

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
        columns={[1, null, null, 2]}
        spacingX={4}
        fields={[
          <StringFormikField key="personalNumber" name="personalNumber" label="Personalnummer" />,
          [
            <SelectFormikField
              key="salutation"
              name="salutation"
              label="Anrede"
              options={[
                {
                  type: 'formStringOption',
                  key: '1',
                  label: capitalize(Salutation.FRAU),
                  value: Salutation.FRAU,
                },
                {
                  type: 'formStringOption',
                  key: '2',
                  label: capitalize(Salutation.HERR),
                  value: Salutation.HERR,
                },
              ]}
            />,
            <StringFormikField key="title" name="title" label="Titel" />,
          ],
          <StringFormikField key="firstName" name="firstName" label="Vorname" isRequired />,
          <StringFormikField key="lastName" name="lastName" label="Nachname" isRequired />,
          <StringFormikField
            key="username"
            name="username"
            label="Kürzel"
            isLoading={checkingUsername}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
              handleUsernameOnBlur(formikBag, e, setCheckingUsername, user)
            }
          />,
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
          <SelectFormikField
            key="role"
            name="role"
            label="Rolle"
            isRequired
            // isDisabled={updateMode}
            options={[
              {
                type: 'formStringOption',
                key: '1',
                value: Role.ADMIN,
                label: capitalize(Role.ADMIN),
              },
              {
                type: 'formStringOption',
                key: '2',
                value: Role.EDITOR,
                label: capitalize(Role.EDITOR),
              },
              {
                type: 'formStringOption',
                key: '3',
                value: Role.USER,
                label: capitalize(Role.USER),
              },
            ]}
            showRequiredIcon
          />,
          <StringFormikField key="company" name="company" label="Firma" />,
          <StringFormikField key="phone" name="phone" label="Telefon" />,
          <StringFormikField key="mobile" name="mobile" label="Mobile" />,
          <EmailFormikField
            key="email"
            name="email"
            label="E-Mail"
            isRequired
            // isDisabled={updateMode}
            isLoading={checkingEmail}
            hasChecker
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleEmailOnBlur(formikBag, e, setCheckingEmail, user)}
          />,
          <StringFormikField key="position" name="position" label="Position" />,
        ]}
      />

      <FormActionsContainer>
        <UserFormActions formikBag={formikBag} isValid={isValid} user={user} />
      </FormActionsContainer>
    </form>
  );
});

export interface UserFormProps {
  user?: User | null;
}

const UserForm: FC<UserFormProps> = ({ user }) => {
  const router = useRouter();

  const initialValues = useMemo<UserCreateFormFields>(
    () => ({
      personalNumber: user?.personalNumber ?? '',
      salutation: user?.salutation ?? null,
      title: user?.title ?? '',
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      username: user?.username ?? '',
      active: user?.active ? 'Ja' : 'Nein',
      role: user?.role ?? Role.USER,
      company: user?.company ?? '',
      phone: user?.phone ?? '',
      mobile: user?.mobile ?? '',
      email: user?.email ?? '',
      position: user?.position ?? '',
    }),
    [user]
  );

  const createUserMutation = useCreateUserMutation();
  const updateUserMutation = useUpdateUserMutation();

  return (
    <Grid gridTemplateColumns={['1fr', null, null, null, '1fr 1fr']} gap={5}>
      <Card border="1px solid" borderColor="gray.200" borderRadius="none" boxShadow="none">
        <Heading as="h3" size="md" p={6} pb={3} d="flex" justifyContent="space-between">
          Personendaten
        </Heading>
        <Box>
          <SpecialFormikContextProvider<UserCreateFormFields>
            initialValues={initialValues}
            validationSchema={userFormYupSchema}
            onSubmit={async (values, { setSubmitting }) => {
              if (!user) {
                await createUserMutation.mutateAsync(values);
              } else {
                await updateUserMutation.mutateAsync({
                  userId: user.id,
                  ...values,
                });
              }

              setSubmitting(false);
              void router.push('/einstellungen/users');
            }}
          >
            <UserEditFormContent user={user} />
          </SpecialFormikContextProvider>
        </Box>
      </Card>
    </Grid>
  );
};

export default UserForm;
