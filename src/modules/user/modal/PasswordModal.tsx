import { User } from '@prisma/client';
import { WithModal, WithModalProps } from 'jexity-app/modal/WithModal';
import React, { FC } from 'react';

import PasswordForm from '../forms/PasswordForm';

interface PasswordModalProps {
  userId: User['id'];
  disclosure: WithModalProps['disclosure'];
}

const PasswordModal: FC<PasswordModalProps> = ({ userId, disclosure }) => {
  return (
    <WithModal
      confirmText="Speichern"
      modalBody={<PasswordForm userId={userId} disclosure={disclosure} />}
      modalHeader="Passwort zurücksetzten"
      scheme="PRIMARY_BRAND"
      disclosure={disclosure}
      showDefaultModalActions={false}
    />
  );
};

export default PasswordModal;
