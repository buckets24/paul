import { Prisma } from '@prisma/client';
import { yupString, yupStringRequired } from 'src/modules/common/yupSchemaFields';
import { number, object, SchemaOf, TypeOf } from 'yup';

export type TaxOfficeFormFields = Omit<
  Prisma.TaxOfficeCreateInput,
  'active' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy' | 'updater' | 'creator'
>;

export const taxOfficeFormFieldsFormYupSchema: SchemaOf<TaxOfficeFormFields> = object().shape({
  name: yupStringRequired(),
  address: yupString(),
  postcode: number().integer(),
  place: yupString(),
  poBox: yupString(),
  postcodePoBox: yupString(),
  active: yupString(),
});

export type TaxOfficeSchema = TypeOf<typeof taxOfficeFormFieldsFormYupSchema>;
