import { Prisma } from '@prisma/client';
import { yupString, yupStringRequired } from 'src/modules/common/yupSchemaFields';
import { object, SchemaOf } from 'yup';

export type MaritalStatusFormFields = Omit<
  Prisma.MaritalStatusCreateInput,
  'active' | 'createdAt' | 'updatedAt' | 'updater' | 'creator'
>;

export const maritalStatusFormYupSchema: SchemaOf<MaritalStatusFormFields> = object().shape({
  name: yupStringRequired(),
  active: yupString(),
});
