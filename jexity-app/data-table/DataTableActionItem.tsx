import { Box, Button, ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';
import { SetRequired } from 'type-fest';

/**
 * Datatable action that is specific to PAUL. This component is used to conform
 * to PAUL's design. But the functionality should always be handled by the parent
 */

export interface DataTableActionItemProps extends SetRequired<ButtonProps, 'leftIcon'> {
  activeColor: string;
  disabledColor: string;
}

const DataTableActionItem: FC<DataTableActionItemProps> = ({
  children,
  isDisabled,
  activeColor,
  disabledColor,
  ...others
}) => {
  return (
    <Button
      variant="ghost"
      justifyContent="flex-start"
      fontFamily="heading"
      fontWeight="bold"
      role="group"
      _focus={{
        outline: 'none',
      }}
      px={0}
      mr={4}
      w="auto"
      color={isDisabled ? disabledColor : activeColor}
      isDisabled={isDisabled}
      _hover={{
        bg: 'none',
      }}
      {...others}
    >
      {children}
      <Box
        pos="absolute"
        bottom={1}
        transformOrigin="center left"
        w="100%"
        h="2px"
        bg="brand.primary.600"
        transition="0.25s"
        transform="scale(0)"
        _groupHover={isDisabled ? undefined : { transform: `scaleX(1)` }}
      />
    </Button>
  );
};

export default DataTableActionItem;
