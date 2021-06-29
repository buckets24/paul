/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MaritalStatus, Prisma } from '@prisma/client';
import { ServicePaginatedParams } from 'src/modules/common/servicePaginatedParams';
import prisma from 'src/utils/prisma';

export async function createMaritalStatus(values: Prisma.MaritalStatusCreateInput) {
  return await prisma.maritalStatus.create({
    data: values,
  });
}

export type CreateMaritalStatusResult = Prisma.PromiseReturnType<typeof createMaritalStatus>;

export type GetMaritalStatusParams = ServicePaginatedParams<Omit<Prisma.MaritalStatusOrderByInput, 'updater'>>;
export async function getMaritalStatus(params: GetMaritalStatusParams) {
  const { limit = params.limit ?? 100, page, q: queryFilter } = params;
  const f: Prisma.StringFilter = { contains: queryFilter };

  const maritalStatus = await prisma.maritalStatus.findMany({
    take: limit,
    skip: page * limit,
    select: {
      id: true,
      name: true,
      active: true,
      updatedAt: true,
      updatedBy: true,
    },
    where: queryFilter !== undefined ? { OR: [{ name: f }] } : undefined,
    orderBy: params.orderBy ?? { id: 'asc' },
  });

  if (maritalStatus.length) {
    return { maritalStatus, nextPageParams: page + 1 };
  }

  return null;
}

export type GetMaritalStatusResult = Prisma.PromiseReturnType<typeof getMaritalStatus>;

export async function getMaritalStatusById(id: number) {
  return await prisma.maritalStatus.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      active: true,
      createdAt: true,
      updatedAt: true,
      updatedBy: true,
    },
  });
}

export type GetMaritalStatusByIdResult = Prisma.PromiseReturnType<typeof getMaritalStatusById>;

export async function updateMaritalStatusById(values: MaritalStatus) {
  return await prisma.maritalStatus.update({
    where: {
      id: values.id,
    },
    data: values,
  });
}

export type UpdateMaritalStatusByIdResult = Prisma.PromiseReturnType<typeof updateMaritalStatusById>;

export async function deleteMaritalStatusById(id: number) {
  return await prisma.maritalStatus.delete({
    where: {
      id,
    },
  });
}

export type DeleteMaritalStatusByIdResult = Prisma.PromiseReturnType<typeof deleteMaritalStatusById>;

export async function deleteMultipleMaritalStatusByIds(ids: number[]) {
  return await prisma.maritalStatus.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
}

export type DeleteMultipleMaritalStatusByIdsResult = { count: number };
