import {
  Button,
  Fade,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SlideFade,
  UseDisclosureProps,
} from '@chakra-ui/react';
import { Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';

export interface DataTableModalProps extends UseDisclosureProps {
  header: string;
  body: string | ReactNode;
  confirmText: string;
  onConfirm: (setIsLoading: Dispatch<SetStateAction<boolean>>) => void;
}

const DataTableModal: FC<DataTableModalProps> = ({ header, body, onClose, isOpen, confirmText, onConfirm }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!onClose || !isOpen) {
    return null;
  }

  return (
    <Fade in={isOpen}>
      <Modal onClose={onClose} isOpen={isOpen} isCentered closeOnOverlayClick={false} closeOnEsc={false}>
        <ModalOverlay zIndex={2}>
          <SlideFade in={isOpen}>
            <ModalContent>
              <ModalHeader>{header}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>{body}</ModalBody>
              <ModalFooter>
                <Button
                  isLoading={isLoading}
                  onClick={() => onConfirm(setIsLoading)}
                  bg={confirmText === 'Löschen' ? 'support.alert.500' : 'brand.primary.600'}
                  color="white"
                  _hover={{ bg: confirmText === 'Löschen' ? 'support.alert.700' : 'brand.primary.700' }}
                >
                  {confirmText}
                </Button>
                <Button
                  variant="outline"
                  borderWidth="1px"
                  borderColor="brand.primary.600"
                  borderRadius="4px"
                  color="brand.primary.600"
                  ml={4}
                  _hover={{ bg: 'brand.primary.200' }}
                  onClick={onClose}
                  isDisabled={isLoading}
                >
                  Abbrechen
                </Button>
              </ModalFooter>
            </ModalContent>
          </SlideFade>
        </ModalOverlay>
      </Modal>
    </Fade>
  );
};

export default DataTableModal;
