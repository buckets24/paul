/**
 * NOTE:
 * Pattern for creating messages would be {module}{category}{service}{messageType}
 */

import { UseToastOptions } from '@chakra-ui/react';

/**
 * SUCESS: Creating marital status toast
 */
export const maritalStatusToastCreatingMaritalStatusSuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Familienstand erstellt',
    description: 'Der Familienstand wurde erfolgreich erstellt',
    isClosable: true,
    ...options,
  };
};

/**
 * SUCESS: Updating marital status toast
 */
export const maritalStatusToastUpdatingMaritalStatusSuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Änderungen erfolgreich übernommen',
    status: 'success',
    isClosable: true,
    ...options,
  };
};

/**
 * SUCCESS: Delete marital status toast
 */
export const maritalStatusToastDeleteMaritalStatusSuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Familienstand wurde gelöscht.',
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Updating marital status toast
 */
export const maritalStatusToastUpdatingMaritalStatusErr = (
  errorCode: string,
  options?: UseToastOptions
): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Aktualisieren',
    description: `Beim Aktualisieren des Familienstand ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};
