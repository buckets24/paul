import { Prisma, Role, Salutation } from '@prisma/client';
import { defaultErrorMessages } from 'jexity-app/form/errorMessages';
import { yupString, yupStringRequired } from 'src/modules/common/yupSchemaFields';
import { mixed, object, SchemaOf, string } from 'yup';

export type UserCreateFormFields = Omit<
  Prisma.UserCreateInput,
  | 'active'
  | 'image'
  | 'password'
  | 'createdAt'
  | 'updatedAt'
  | 'maritalStatusCreatedBy'
  | 'maritalStatusUpdatedBy'
  | 'taxOfficeCreatedBy'
  | 'taxOfficeUpdatedBy'
  | 'funktionCreatedBy'
  | 'funktionUpdatedBy'
>;

export const userFormYupSchema: SchemaOf<UserCreateFormFields> = object()
  .shape({
    personalNumber: yupString().defined(),
    salutation: mixed<Salutation>().oneOf([Salutation.FRAU, Salutation.HERR], defaultErrorMessages.salutationOneOfMsg),
    title: string(),
    firstName: yupStringRequired(),
    lastName: yupStringRequired(),
    username: string().min(3, defaultErrorMessages.globalMinLengthMsg),
    active: yupString(),
    role: mixed<Role>().oneOf([Role.ADMIN, Role.EDITOR, Role.USER]).defined(defaultErrorMessages.roleDefinedMsg),
    company: yupString().defined(),
    phone: yupString().defined(),
    mobile: yupString().defined(),
    email: yupStringRequired(),
    position: yupString().defined(),
  })
  .noUnknown();
