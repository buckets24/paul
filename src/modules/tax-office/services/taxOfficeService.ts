/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Prisma, TaxOffice } from '@prisma/client';
import { ServicePaginatedParams } from 'src/modules/common/servicePaginatedParams';
import prisma from 'src/utils/prisma';

export async function getTaxOffices(
  params: ServicePaginatedParams<Omit<Prisma.TaxOfficeOrderByInput, 'updater' | 'creator'>>
) {
  const { limit, page, q: queryFilter } = params;
  const f: Prisma.StringFilter = { contains: queryFilter };

  const taxOffices = await prisma.taxOffice.findMany({
    take: limit,
    skip: page * (limit ?? 100),
    select: {
      id: true,
      name: true,
      address: true,
      postcode: true,
      place: true,
      poBox: true,
      postcodePoBox: true,
      active: true,
      updatedBy: true,
      updatedAt: true,
    },
    where:
      queryFilter !== undefined
        ? {
            OR: [{ name: f }, { address: f }, { place: f }, { poBox: f }, { postcodePoBox: f }, { poBox: f }],
          }
        : undefined,
    orderBy: params.orderBy ?? { id: 'asc' },
  });

  if (taxOffices.length) {
    return { taxOffices, nextPageParams: page + 1 };
  }

  return null;
}

export type GetTaxOfficesResult = Prisma.PromiseReturnType<typeof getTaxOffices>;

export async function createTaxOffice(values: Prisma.TaxOfficeCreateInput) {
  return await prisma.taxOffice.create({
    data: values,
  });
}

export type CreateTaxOfficeResult = Prisma.PromiseReturnType<typeof createTaxOffice>;

export async function getTaxOfficeById(id: number) {
  return await prisma.taxOffice.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      address: true,
      postcode: true,
      place: true,
      poBox: true,
      postcodePoBox: true,
      active: true,
      updatedBy: true,
      updatedAt: true,
    },
  });
}

export type GetTaxOfficeByIdResult = Prisma.PromiseReturnType<typeof getTaxOfficeById>;

export async function updateTaxOfficeById(values: TaxOffice) {
  return await prisma.taxOffice.update({
    where: {
      id: values.id,
    },
    data: values,
  });
}

export type UpdateTaxOfficeByIdResult = Prisma.PromiseReturnType<typeof updateTaxOfficeById>;

export async function deleteTaxOfficeById(id: number) {
  return await prisma.taxOffice.delete({
    where: { id },
  });
}

export type DeleteTaxOfficeByIdResult = Prisma.PromiseReturnType<typeof deleteTaxOfficeById>;

export async function deleteMultipleTaxOfficeByIds(ids: number[]) {
  return await prisma.taxOffice.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
}

export type DeleteMultipleTaxOfficesResult = Prisma.PromiseReturnType<typeof deleteMultipleTaxOfficeByIds>;
