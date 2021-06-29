import { GetLayout } from 'jexity-app/layout/layoutApi';
import LoginLayout from 'jexity-app/layout/LoginLayout';
import React, { FC } from 'react';

const AuthenticationLayout: FC = ({ children }) => {
  return <LoginLayout>{children}</LoginLayout>;
};

export const getAuthenticationLayout: GetLayout = (page) => <AuthenticationLayout>{page}</AuthenticationLayout>;

export default AuthenticationLayout;
