/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Prisma, User } from '@prisma/client';
import CryptoJS from 'crypto-js';
import { ServicePaginatedParams } from 'src/modules/common/servicePaginatedParams';
import prisma from 'src/utils/prisma';

/**
 * Get all users
 *
 * @returns GetUserResult
 */
export async function getUsers(
  params: ServicePaginatedParams<
    Omit<Prisma.UserOrderByInput, 'maritalStatusCreatedBy' | 'taxOfficeCreatedBy' | 'funktionCreatedBy'>
  >
) {
  const { limit = 100, page, q: queryFilter } = params;
  const f: Prisma.StringFilter = { contains: queryFilter };

  const users = await prisma.user.findMany({
    take: limit,
    skip: page * limit,
    select: {
      id: true,
      salutation: true,
      firstName: true,
      lastName: true,
      company: true,
      email: true,
      position: true,
    },
    where:
      queryFilter !== undefined
        ? { OR: [{ firstName: f }, { lastName: f }, { company: f }, { email: f }, { position: f }] }
        : undefined,
    orderBy: params.orderBy,
  });

  if (users.length) {
    return { users, nextPageParams: page + 1 };
  }
}

export type GetUsersResult = Prisma.PromiseReturnType<typeof getUsers>;

/**
 * Get user by id
 *
 * @param id number
 *
 * @returns GetUserResult
 */
export async function getUserById(id: number) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      salutation: true,
      title: true,
      firstName: true,
      lastName: true,
      image: true,
      company: true,
      phone: true,
      mobile: true,
      email: true,
      position: true,
      createdAt: true,
      updatedAt: true,
      personalNumber: true,
      username: true,
      active: true,
      role: true,
      password: true,
    },
  });
}

export type GetUserResult = Prisma.PromiseReturnType<typeof getUserById>;

/**
 * Get user by email
 * @param email string
 * @returns User
 */
export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export type GetUserByEmailResult = Prisma.PromiseReturnType<typeof getUserByEmail>;

/**
 * Create a user
 * @param values UserFormFields
 * @returns CreateUserResult
 */
export async function createUser(values: Prisma.UserCreateInput) {
  return await prisma.user.create({
    data: values,
  });
}

export type CreateUserResult = Prisma.PromiseReturnType<typeof createUser>;

/**
 *  A function for updating
 * @param id  Required ID
 * @param data UserUpdateInput but removing password because we should not allow it
 * @returns
 */
export async function updateUserById(id: User['id'], data: Omit<Prisma.UserUpdateInput, 'password'>) {
  return await prisma.user.update({
    where: { id },
    data: data,
  });
}
export type UpdateUserResult = Prisma.PromiseReturnType<typeof updateUserById>;

/**
 * Delete user by id
 * @param id number
 * @returns DeleteUserResult
 */
export async function deleteUserById(id: User['id']) {
  return await prisma.user.delete({
    where: { id },
  });
}
export type DeleteUserResult = Prisma.PromiseReturnType<typeof deleteUserById>;

/**
 * Delete users by ids
 *
 * @param ids       number[]
 * @returns count   number
 */
export async function deleteUsersByIds(ids: number[]) {
  return await prisma.user.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
}

export type DeleteMultipleUsersResult = { count: number };

/**
 * Login user
 *
 * @param username string
 * @param password string
 *
 * @returns LoginUserResult
 */
export async function loginUser({ username, password }: LoginUserInput) {
  if (typeof window === 'undefined') {
    if (!process.env.cryptoSecret) {
      throw new Error('`process.env.cryptoSecret` was not defined. Make sure it is being called server-side');
    }

    const user = await prisma.user.findFirst({
      where: {
        username,
        password: CryptoJS.HmacSHA512(password, process.env.cryptoSecret).toString(),
      },
    });

    return user;
  } else {
    // Just an extra precaution and an early warning to devs if something isn't right.
    throw new Error(
      'loginUser service invoked client-side! This should never happen and should only be called server side.'
    );
  }
}
export type LoginUserResult = Prisma.PromiseReturnType<typeof loginUser>;
export type LoginUserInput = { username: string; password: string };

export async function updatePasswordByUserId(userId: User['id'], password: NonNullable<User['password']>) {
  if (!process.env.cryptoSecret) {
    throw new Error('process.env.cryptoSecret was not defined');
  }
  const encrypted = CryptoJS.HmacSHA512(password, process.env.cryptoSecret).toString();
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: encrypted,
    },
  });
}
export type UpdatePasswordByUserIdResult = Prisma.PromiseReturnType<typeof updatePasswordByUserId>;
export type UpdatePasswordInput = Parameters<typeof updatePasswordByUserId>;
