import { defaultErrorMessages } from 'jexity-app/form/errorMessages';
import { number, NumberSchema, object, ref, SchemaOf, string, StringSchema } from 'yup';
import { DefinedStringSchema } from 'yup/lib/string';

/**
 * String
 */
export const yupString = (
  required = false,
  requiredMessage?: string | undefined | null
): StringSchema<string | undefined | null, Record<string, any>, string | undefined | null> => {
  if (required) {
    return string().required(requiredMessage ?? defaultErrorMessages.globalRequiredMsg);
  }

  return string().nullable().default('');
};

export const yupStringRequired = (
  requiredMessage?: string | undefined | null
): DefinedStringSchema<string | undefined, Record<string, any>> => {
  return string()
    .required(requiredMessage ?? defaultErrorMessages.globalRequiredMsg)
    .defined()
    .default('');
};

/**
 * Select / Radio
 */
export const yupOptions = (
  options: string[],
  required = false,
  requiredMessage?: string | undefined | null,
  invalidSelectionMessage?: string | undefined | null
): StringSchema<string | undefined | null, Record<string, any>, string | undefined | null> => {
  if (required) {
    return string()
      .required(requiredMessage ?? defaultErrorMessages.globalRequiredMsg)
      .oneOf(options, invalidSelectionMessage ?? defaultErrorMessages.globalRequiredMsg)
      .default('');
  }

  return string()
    .oneOf([undefined, null, '', ...options], invalidSelectionMessage ?? defaultErrorMessages.globalRequiredMsg)
    .nullable()
    .default(undefined);
};

/**
 * Email
 */
export const yupEmail = (
  required = false,
  requiredMessage?: string | undefined | null,
  invalidFormatErrorMessage?: string | undefined | null
): StringSchema<string | undefined | null, Record<string, any>, string | undefined | null> => {
  if (required) {
    return string()
      .email(invalidFormatErrorMessage ?? defaultErrorMessages.invalidEmailMsg)
      .required(requiredMessage ?? defaultErrorMessages.globalRequiredMsg)
      .defined();
  }

  return string().email().nullable();
};

export const yupEmailRequired = (
  requiredMessage?: string | undefined | null,
  invalidFormatErrorMessage?: string | undefined | null
): DefinedStringSchema<string | undefined, Record<string, any>> => {
  return string()
    .email(invalidFormatErrorMessage ?? defaultErrorMessages.invalidEmailMsg)
    .required(requiredMessage ?? defaultErrorMessages.globalRequiredMsg)
    .defined()
    .default('');
};

/**
 * Number
 */
export const yupNumber = (
  required = false,
  requiredMessage?: string | undefined | null,
  invalidFormatErrorMessage?: string | undefined | null
): NumberSchema<number | undefined | null, Record<string, any>, number | undefined | null> => {
  if (required) {
    return number()
      .required(requiredMessage ?? defaultErrorMessages.globalRequiredMsg)
      .typeError(invalidFormatErrorMessage ?? defaultErrorMessages.invalidNumberFormatMsg);
  }
  return number()
    .typeError(invalidFormatErrorMessage ?? defaultErrorMessages.invalidNumberFormatMsg)
    .nullable();
};

/**
 * Password
 */
export const yupPassword = (
  requiredMessage?: string | undefined | null
): StringSchema<string | undefined | null, Record<string, any>, string | undefined | null> => {
  return string()
    .required(requiredMessage ?? defaultErrorMessages.globalRequiredMsg)
    .matches(/^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, defaultErrorMessages.invalidPasswordMsg);
};

export interface LoginInput {
  email: string;
  password: string;
}
export const loginFormYupSchema = object().shape({
  username: yupString(true),
  password: yupString(true),
});

export type VerifyPasswordYupSchema = {
  password: string;
  repeatPassword: string;
};
export const verifyPasswordYupSchema: SchemaOf<VerifyPasswordYupSchema> = object().shape({
  password: yupPassword().required(),
  repeatPassword: yupString()
    .required()
    .oneOf([ref('password'), null], defaultErrorMessages.passwordMismatchMsg),
});

export const verifyEmailFormYupSchema = object().shape({
  email: yupString(true),
});

export const resetPasswordFormYupSchema = object().shape({
  verificationCode: yupString(true),
  password: yupPassword(),
  repeatPassword: yupPassword(),
});
