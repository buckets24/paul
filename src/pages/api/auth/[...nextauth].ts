import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { User } from 'next-auth';
// import { GenericObject, SessionBase } from 'next-auth/_utils';
import Adapters from 'next-auth/adapters';
import Providers from 'next-auth/providers';
import { loginUser, LoginUserInput } from 'src/modules/user/services/userService';

import prisma from '../../../utils/prisma';

const options: any = {
  pages: {
    error: '/login',
    signIn: '/login',
  },
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      name: 'Benutzername',
      credentials: {
        username: { label: 'Benutzername', type: 'text' },
        password: { label: 'Passwort', type: 'password' },
      },
      authorize: async (credentials: LoginUserInput) => {
        try {
          const user = await loginUser(credentials);

          if (!user) {
            log(LogLevel.error, 'INVALID_CREDENTIALS', {
              label: 'LoginUserHandler',
              message: 'Could not log in user. Invalid credentials.',
            });
            return Promise.resolve(null);
          }

          log(LogLevel.info, 'SUCCESSFULLY_LOGGED_IN_USER', {
            label: 'LoginUserHandler',
            message: `User ${user.username} logged in.`,
          });

          return Promise.resolve(user);
        } catch (e) {
          log(LogLevel.error, 'FAILED_TO_LOGIN_USER', {
            label: 'LoginUserHandler',
            message: e.message ?? 'Something went wrong when validating credentials',
            ...e,
          });
          return Promise.resolve(null);
        }
      },
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  callbacks: {
    signIn: async (): Promise<boolean> => {
      return Promise.resolve(true);
    },
    session: async (session: any, user: Record<string, undefined>): Promise<any> => {
      session.accessToken = user.accessToken;

      return Promise.resolve(session);
    },
    redirect: async (url: string, baseUrl: string): Promise<string> => {
      return url.startsWith(baseUrl) ? Promise.resolve(url) : Promise.resolve(baseUrl);
    },
    jwt: async (token: any, user: User): Promise<any> => {
      token = { ...token, ...user };

      return Promise.resolve(token);
    },
  },
  database: process.env.DATABASE_URL,
  debug: true,
  session: {
    jwt: true,
  },
};

export default (req: NextApiRequest, res: NextApiResponse): any => {
  return NextAuth(req, res, options);
};
