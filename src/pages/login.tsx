import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Link, Stack, Text, useToast } from '@chakra-ui/react';
import anylogger from 'anylogger';
import { PasswordFormikField } from 'jexity-app/form/fields/PasswordField';
import { StringFormikField } from 'jexity-app/form/fields/StringField';
import { FormGridLayout } from 'jexity-app/form/FormGridLayout';
import { SpecialFormikContextProvider } from 'jexity-app/form/useFormikByName';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import React, { FC, useEffect } from 'react';
import { loginFormYupSchema } from 'src/modules/common/yupSchemaFields';
import { Logo } from 'src/theme/icons/Logo';

const log = anylogger('paul-2.0');

const Login: FC & HasLayout = () => {
  const {
    query: { error: errorParam },
  } = useRouter();

  const toast = useToast();

  useEffect(() => {
    if (errorParam === 'CredentialsSignin') {
      toast({
        title: 'Anmeldung fehlgeschlagen',
        description: 'Überprüfen Sie Ihre Zugangsdaten und versuchen Sie es erneut',
        status: 'error',
      });
    }
  }, [errorParam, toast]);

  return (
    <Flex minH={'100vh'} align={'center'} flexDirection="column" justify={'center'} bg={'brand.primary.800'}>
      <Stack spacing={8} mx={'auto'} width={'25rem'} py={12} px={6} position="absolute" top={['3.5rem', '7.5rem']}>
        <Stack align={'center'} mb="1.25rem">
          <Logo height="124px" mb={8} />
          <Heading as="h1" fontSize={'2.5rem'} color="white">
            PAUL 2.0 Login
          </Heading>
        </Stack>
        <Box>
          <SpecialFormikContextProvider
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={loginFormYupSchema}
            onSubmit={async (values) => {
              const { username, password } = values;
              try {
                await signIn('credentials', {
                  username,
                  password,
                  callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/dashboard`,
                });
              } catch (e) {
                log.debug('Error on login', e);
                toast({
                  title: 'Fehler',
                  description: 'Ein unbekannter Fehler ist aufgetreten!',
                  status: 'error',
                });
              }
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit} noValidate>
                <FormGridLayout
                  columns={1}
                  fields={[
                    <StringFormikField
                      color="white"
                      key="username"
                      name="username"
                      label="Benutzername"
                      variant="default"
                      isRequired={true}
                      showRequiredIcon={false}
                    />,
                    <PasswordFormikField
                      color="white"
                      key="password"
                      name="password"
                      label="Passwort"
                      isRequired={true}
                      showRequiredIcon={false}
                    />,
                  ]}
                />
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  mt={4}
                  py={6}
                  w="100%"
                  bg="brand.primary.600"
                  borderRadius="4px"
                  color="white"
                  fontSize="lg"
                  fontWeight="600"
                  rightIcon={<ArrowForwardIcon boxSize={6} />}
                  _hover={{ bg: 'brand.primary.700' }}
                >
                  Einloggen
                </Button>
              </form>
            )}
          </SpecialFormikContextProvider>
          <Stack textAlign="center">
            <Box flexDirection="column" d="flex" mt={0}>
              <Link color={'white'} mt={3} fontSize="sm">
                Passwort vergessen?
              </Link>
              <Link color={'brand.primary.600'} mt={2} fontSize="sm" fontWeight="semibold">
                Kontaktieren Sie Ihren Administrator
              </Link>
            </Box>
          </Stack>
        </Box>
      </Stack>
      <Box spacing={1} position="absolute" bottom="1.5rem">
        <Stack>
          <Flex justifyContent="space-around">
            <Link color={'brand.primary.600'} fontWeight="semibold" fontSize="sm">
              Imprint
            </Link>
            <Link color={'brand.primary.600'} fontWeight="semibold" fontSize="sm">
              Datenschutz
            </Link>
          </Flex>
        </Stack>
        <Text pt={6} fontSize={'sm'} textAlign={'center'} color="white">
          &copy; 2021 Paul 2.0. All Rights Reserved.
        </Text>
      </Box>
    </Flex>
  );
};

// Login.getLayout = getAuthenticationLayout;
export default Login;
