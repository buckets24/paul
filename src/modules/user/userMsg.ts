import { UseToastOptions } from '@chakra-ui/react';

/**
 * NOTE:
 * Pattern for creating messages would be {module}{category}{service}{messageType}
 */

/**
 * SUCESS: Creating user toast
 */
export const userToastCreatingUserSuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Benutzer erstellt',
    description: 'Der Benutzer wurde erfolgreich erstellt',
    isClosable: true,
    ...options,
  };
};

/**
 * SUCESS: Updating user toast
 */
export const userToastUpdatingUserSuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Änderungen erfolgreich übernommen',
    status: 'success',
    isClosable: true,
    ...options,
  };
};

/**
 * SUCCESS: Delete user toast
 */
export const userToastDeleteUserSuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Benutzer wurde gelöscht.',
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Creating user toast
 */
export const userToastCreatingUserErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Erstellen',
    description: `Beim Erstellen des Benutzer ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Updating user toast
 */
export const userToastUpdatingUserErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Aktualisieren',
    description: `Beim Aktualisieren des Benutzer ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};
