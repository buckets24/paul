import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const FormActionsContainer: FC = ({ children }) => {
  const [formActionsContainerRoot, setFormActionsContainerRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (document) {
      return setFormActionsContainerRoot(document.getElementById('form-actions-container'));
    }
  }, []);

  return formActionsContainerRoot && createPortal(children, formActionsContainerRoot);
};

export default FormActionsContainer;
