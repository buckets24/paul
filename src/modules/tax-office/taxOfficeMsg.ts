/**
 * NOTE:
 * Pattern for creating messages would be {module}{category}{service}{messageType}
 */

import { UseToastOptions } from '@chakra-ui/react';

/**
 * SUCESS: Creating tax office toast
 */
export const taxOfficeToastCreatingTaxOfficeSuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Finanzamt erstellt',
    description: 'Der Finanzamt wurde erfolgreich erstellt',
    isClosable: true,
    ...options,
  };
};

/**
 * SUCESS: Updating tax office toast
 */
export const taxOfficeToastUpdatingTaxOfficeSuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Änderungen erfolgreich übernommen',
    status: 'success',
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Updating tax office toast
 */
export const taxOfficeToastUpdatingTaxOfficeErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Aktualisieren',
    description: `Beim Aktualisieren des Finanzamt ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * SUCCESS: Delete tax office toast
 */
export const taxOfficeToastDeleteTaxOfficeSuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Finanzamt wurde gelöscht.',
    isClosable: true,
    ...options,
  };
};
