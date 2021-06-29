import { FormikConfig, FormikContext, FormikContextType, FormikValues, useFormik } from 'formik';
import NoExtraProperties from 'jexity-app/utils/type-utils/NoExtraProperties';
import { FC, ReactNode, useEffect } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

export const SpecialFormikContext = createContext<FormikContextType<any> | null>(null);

export type FormikBag = ReturnType<typeof useFormik>;

interface SpecialFormikContextProviderProps<T> extends Omit<FormikConfig<T>, 'onSubmit' | 'initialValues'> {
  onChange?: (v: FormikValues) => void;
  /**
   * TODO: someday figure this out
   * For functions that are passed to this context,
   * I am unable to figure out how to handle the typings.
   * useFormik does not have explicit return type, so we use ReturnType<typeof useFormik>
   * but this method does not allow us to pass a type generic
   */
  children: ((props: any) => ReactNode) | ReactNode;
  onSubmit?: FormikConfig<T>['onSubmit'];
  initialValues: NoExtraProperties<T>;
}

export function SpecialFormikContextProvider<T = any>({
  children,
  onChange,
  onSubmit,
  ...formikConfig
}: SpecialFormikContextProviderProps<T>): ReturnType<FC> {
  const formikBag = useFormik<T>({
    ...formikConfig,

    onSubmit: onSubmit ?? (() => undefined), // Sometimes we don't need the on submit
  });

  const output = typeof children === 'function' ? children(formikBag) : children;

  useEffect(() => {
    onChange?.(formikBag.values);
  }, [formikBag.values, onChange]);

  return (
    <SpecialFormikContext.Provider value={formikBag}>
      {/* NOTICE that the below there is still FormikContext, double context. It just allows for backwards compatibility with useFormikContext() but still can use useFormikByName() */}
      {/* This could be removed eventually. I'm thinking though that there is no harm in keeping this */}
      <FormikContext.Provider value={formikBag}>{output}</FormikContext.Provider>
    </SpecialFormikContext.Provider>
  );
}

export const useFormikByName = (
  name: string
): {
  value: any;
  error: FormikContextType<FormikValues>['errors'][string];
  touch: FormikContextType<FormikValues>['touched'][string];
  onChange: FormikContextType<FormikValues>['handleChange'] | undefined;
  onBlur: FormikContextType<FormikValues>['handleBlur'] | undefined;
  setFieldValue: FormikContextType<FormikValues>['setFieldValue'] | undefined;
  setFieldTouched: FormikContextType<FormikValues>['setFieldTouched'] | undefined;
  initialValue: any;
} => {
  const value = useContextSelector(SpecialFormikContext, (c) => c?.values[name]);
  const touch = useContextSelector(SpecialFormikContext, (c) => c?.touched[name]);
  const error = useContextSelector(SpecialFormikContext, (c) => c?.errors[name]);
  const onChange = useContextSelector(SpecialFormikContext, (c) => c?.handleChange);
  const onBlur = useContextSelector(SpecialFormikContext, (c) => c?.handleBlur);
  const setFieldValue = useContextSelector(SpecialFormikContext, (c) => c?.setFieldValue);
  const setFieldTouched = useContextSelector(SpecialFormikContext, (c) => c?.setFieldTouched);
  const initialValue = useContextSelector(SpecialFormikContext, (c) => c?.initialValues[name]);

  return {
    value,
    error,
    touch,
    onChange,
    onBlur,
    setFieldValue,
    setFieldTouched,
    initialValue,
  };
};
