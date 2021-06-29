import { createStandaloneToast } from '@chakra-ui/react';
import { User } from '@prisma/client';
import axios from 'axios';
import { FormikContextType } from 'formik';
import { defaultErrorMessages } from 'jexity-app/form/errorMessages';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { Dispatch } from 'react';
import { string } from 'yup';

import { GetUserByUsernameHandlerResponse } from '../user/handlers/getUserByUsernameHandler';
import { yupEmailRequired } from './yupSchemaFields';

export const handleEmailOnBlur = async (
  formikBag: FormikContextType<any> | null,
  e: React.FocusEvent<HTMLInputElement>,
  setLoading: Dispatch<React.SetStateAction<boolean>>,
  user?: User | null
): Promise<void> => {
  if (formikBag) {
    const { setStatus, setFieldError, handleBlur } = formikBag;
    const id = e.target.id;
    const email = e.target.value;
    const toast = createStandaloneToast();

    handleBlur(e);
    setLoading(true);
    setStatus('checking-email');

    try {
      const isValid = await yupEmailRequired().isValid(email);

      if (isValid) {
        // Skip/return if email equals current User's email
        if (user && email === user.email) {
          return;
        }

        const response = await axios.get(`/api/email/exists?email=${email}`);
        const emailAlreadyExist = response.data;

        if (emailAlreadyExist) {
          setFieldError(id, defaultErrorMessages.emailAlreadyExist);
        }
      } else {
        setFieldError(id, defaultErrorMessages.invalidEmailMsg);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const errorCode = log(LogLevel.error, e.message, {
          label: 'HandleEmailOnBlur error',
          message: `The API responded with an error: ${e.stack}`,
        });
        toast({
          title: 'Fehler',
          description: `Fehler beim Überprüfen der E-Mail, ob sie vorhanden ist oder nicht. (Fehlercode: ${errorCode})`,
          status: 'error',
          duration: 15000,
          isClosable: true,
        });
      }
    } finally {
      setStatus(undefined);
      setLoading(false);
    }
  }
};

export const handleUsernameOnBlur = async (
  formikBag: FormikContextType<any> | null,
  e: React.FocusEvent<HTMLInputElement>,
  setLoading: Dispatch<React.SetStateAction<boolean>>,
  user?: User | null
): Promise<void> => {
  if (formikBag) {
    const { setStatus, setFieldError, handleBlur } = formikBag;
    const id = e.target.id;
    const username = e.target.value;
    const toast = createStandaloneToast();

    handleBlur(e);
    setLoading(true);
    setStatus('checking-username');

    try {
      const isValid = await string().min(3, defaultErrorMessages.globalMinLengthMsg).isValid(username);

      if (isValid) {
        // Skip/return if username equals current User's username
        if (user && username === user.username) {
          return;
        }

        const response = await axios.get<GetUserByUsernameHandlerResponse>(
          `/api/users/username/exists?username=${username}`
        );
        const usernameAlreadyExists = response.data;

        if (usernameAlreadyExists) {
          setFieldError(id, defaultErrorMessages.usernameAlreadyExists);
        }
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const errorCode = log(LogLevel.error, e.message, {
          label: 'HandleUsernameOnBlur error',
          message: `The API responded with an error: ${e.stack}`,
        });
        toast({
          title: 'Fehler',
          description: `Fehler beim Überprüfen der Kürzel, ob sie vorhanden ist oder nicht. (Fehlercode: ${errorCode})`,
          status: 'error',
          duration: 15000,
          isClosable: true,
        });
      }
    } finally {
      setStatus(undefined);
      setLoading(false);
    }
  }
};
