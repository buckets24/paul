import {
  BoxProps,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { FC } from 'react';

import { useFormikByName } from '../useFormikByName';
import { ErrorMessageContainer } from './common/ErrorMessageContainer';
import { FieldControl, FieldVariant, PasswordFormField } from './fieldApi';

export type PasswordFieldType = FieldControl<HTMLInputElement> &
  Omit<PasswordFormField, 'type'> &
  Omit<BoxProps, 'onChange'>;

export const PasswordField: FC<FieldControl & Omit<PasswordFormField, 'type'>> = ({
  variant = FieldVariant.DEFAULT,
  name,
  label,
  helperText,
  isRequired = false,
  isInvalid,
  leftIcon,
  rightIcon,
  showRequiredIcon = true,
  value,
  error,
  onChange,
  onBlur,
  disabled = false,
  errorMessageSpacer = true,
  inputProps,
  ...others
}) => {
  const styles = useMultiStyleConfig('Form', {
    size: 'lg',
    variant,
  });

  return (
    <FormControl
      id={name}
      isInvalid={isInvalid}
      isRequired={isRequired && showRequiredIcon}
      sx={styles.formControl}
      isDisabled={disabled}
      {...others}
    >
      <FormLabel sx={styles.formLabel}>{label}</FormLabel>
      <InputGroup>
        {leftIcon && (
          <InputLeftElement zIndex={0} pointerEvents="none">
            {leftIcon}
          </InputLeftElement>
        )}
        <Input
          type="password"
          value={value}
          variant={variant}
          placeholder={label}
          onChange={onChange}
          onBlur={onBlur}
          sx={styles.formInput}
        />
        {rightIcon && (
          <InputRightElement zIndex={0} pointerEvents="none">
            {rightIcon}
          </InputRightElement>
        )}
      </InputGroup>
      {variant === FieldVariant.DEFAULT || variant === FieldVariant.FLUSHED ? (
        <ErrorMessageContainer errorMessageSpacer={errorMessageSpacer}>
          {helperText && !isInvalid && <FormHelperText sx={styles.formHelper}>{helperText}</FormHelperText>}
          <FormErrorMessage sx={styles.formError}>{error}</FormErrorMessage>
        </ErrorMessageContainer>
      ) : null}
    </FormControl>
  );
};

export const PasswordFormikField: FC<PasswordFieldType> = ({ name, ...props }) => {
  const { value = '', touch, error, onBlur, onChange } = useFormikByName(name);

  return (
    <PasswordField
      name={name}
      isInvalid={touch && error ? true : false}
      error={error}
      value={value ?? ''}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
  );
};
