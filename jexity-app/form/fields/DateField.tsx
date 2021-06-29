import {
  BoxProps,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SystemStyleObject,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { Calendar, CalendarProps } from 'jexity-app/calendar/Calendar';
import { CloseIcon } from 'jexity-app/icons/CloseIcon';
import { InputErrorIcon } from 'jexity-app/icons/InputErrorIcon';
import { flushedLabelStyle } from 'jexity-app/styles/form/flushedLabel';
import React, { FC, memo, useCallback } from 'react';

import { useFormikByName } from '../useFormikByName';
import { ErrorMessageContainer } from './common/ErrorMessageContainer';
import { DateFormField, FieldControl } from './fieldApi';

type D = FieldControl<HTMLInputElement> & Omit<DateFormField, 'type'> & Omit<BoxProps, 'onChange'>;

export interface DateFieldType extends D {
  dateFormat?: CalendarProps['dateFormat'];
}

export const DateField: FC<DateFieldType> = memo(
  ({
    variant = 'default',
    name,
    label,
    helperText,
    isRequired,
    leftIcon,
    rightIcon,
    showRequiredIcon,
    withTime,
    disablePastDates,
    disablePastTime,
    disableFutureDates,
    value,
    error,
    isInvalid,
    onChange,
    onBlur,
    errorMessageSpacer = false,
    dateFormat,
    inputProps,
    disabled = false,
    isReadOnly = false,
    ...otherProps
  }) => {
    const styles = useMultiStyleConfig('Form', {
      size: 'lg',
      variant: variant ? variant : 'default',
    });

    const inFuture = (date: Date) => {
      return date.setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0);
    };

    return (
      <FormControl
        id={name}
        isInvalid={isInvalid}
        isRequired={isRequired && showRequiredIcon}
        sx={{ ...styles.formControl, ...(otherProps as SystemStyleObject) }}
        isDisabled={disabled}
      >
        {label && (
          <FormLabel {...(flushedLabelStyle(variant, styles.formLabel, value) as FormLabelProps)}>{label}</FormLabel>
        )}
        <InputGroup>
          {leftIcon && (
            <InputLeftElement zIndex={0} pointerEvents="none">
              {leftIcon}
            </InputLeftElement>
          )}
          <Calendar
            placeholderText={variant === 'flushed' ? '' : withTime ? `DD.MM.YYYY; HH:MM` : 'DD.MM.YYYY'}
            selected={value ? new Date(value) : null}
            locale="de"
            onChange={onChange}
            customInput={
              <Input
                pt={value && variant === 'flushed' ? 5 : 0}
                pl={4}
                variant={variant}
                placeholder={variant !== 'flushed' ? label : ''}
                onChange={onChange}
                onBlur={onBlur}
                sx={{ ...styles.formInput, ...(inputProps as SystemStyleObject) }}
                autoComplete="off"
                isReadOnly={isReadOnly}
                {...(isReadOnly && {
                  cursor: 'pointer',
                })}
              />
            }
            minDate={disablePastDates ? new Date() : null}
            maxDate={disableFutureDates ? new Date() : null}
            {...(disablePastTime && {
              minTime: inFuture(new Date(value)) ? new Date(new Date(value).setHours(0, 0, 0, 0)) : new Date(),
              maxTime: inFuture(new Date(value))
                ? new Date(new Date(value).setHours(23, 59, 59, 999))
                : new Date(new Date().setHours(23, 59, 59, 999)),
            })}
            popperPlacement="bottom-end"
            withTime={withTime}
            boxShadow
            dateFormat={dateFormat}
          />
          {isInvalid && variant === 'flushed' && (
            <InputRightElement zIndex={0} h="100%" alignItems="center" pointerEvents="none">
              <InputErrorIcon />
            </InputRightElement>
          )}
          {value && !disabled && (
            <InputRightElement h="100%">
              <IconButton
                aria-label="Clear date"
                ml={2}
                minW="18px"
                h="18px"
                borderRadius="50%"
                bg="brand.primary.500"
                icon={<CloseIcon w="8px" h="8px" color="white" />}
                onClick={() => onChange()}
                _hover={{
                  bg: 'brand.primary.900',
                }}
              />
            </InputRightElement>
          )}
          {rightIcon && !value && (
            <InputRightElement zIndex={0} h="48px" pointerEvents="none">
              {rightIcon}
            </InputRightElement>
          )}
        </InputGroup>
        {variant === 'default' || variant === 'flushed' ? (
          <ErrorMessageContainer errorMessageSpacer={errorMessageSpacer}>
            {helperText && !isInvalid && <FormHelperText sx={styles.formHelper}>{helperText}</FormHelperText>}
            <FormErrorMessage sx={styles.formError}>{error}</FormErrorMessage>
          </ErrorMessageContainer>
        ) : null}
      </FormControl>
    );
  }
);

export const DateFormikField: FC<DateFieldType> = memo(
  ({ name, withTime = false, disablePastDates = false, ...props }) => {
    const { value, touch, error, onBlur, setFieldValue } = useFormikByName(name);

    const memoizedOnChange = useCallback<(date: Date | null) => void>(
      (date) => {
        setFieldValue?.(name, date ? date.toISOString() : null);
      },
      [setFieldValue, name]
    );

    return (
      <DateField
        name={name}
        isInvalid={touch && error ? true : false}
        value={value}
        error={error}
        onChange={memoizedOnChange}
        onBlur={onBlur}
        withTime={withTime}
        disablePastDates={disablePastDates}
        {...props}
      />
    );
  }
);
