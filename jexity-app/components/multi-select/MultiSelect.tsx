import { useBaseTheme } from 'jexity-app/baseTheme/baseTheme';
import { FC } from 'react';
import Select, { Props, Styles } from 'react-select';

type OptionType = {
  value: string;
  label: string;
};

export const MultiSelect: FC<Props> = ({ options, isInvalid, ...others }) => {
  const { colors, fontSizes } = useBaseTheme();
  const styles: Styles<OptionType, false> = {
    container: (base) => {
      return {
        ...base,
        width: '100%',
      };
    },
    control: (base) => {
      return {
        ...base,
        minHeight: '48px',
        borderRadius: '4px',
        borderWidth: '1px',
        // borderColor: !isInvalid ? colors?.gray?.[300] : colors?.support?.alert?.[500],
        fontSize: typeof fontSizes?.md === 'string' ? fontSizes.md : undefined,
        fontWeight: 500,
        outline: 'none',
        boxShadow: 'none',
      };
    },
    menuList: (base) => {
      return {
        ...base,
        fontSize: typeof fontSizes?.md === 'string' ? fontSizes.md : undefined,
        fontWeight: 500,
      };
    },
    multiValue: (base) => {
      return {
        ...base,
        background: colors?.brand?.primary[500],
        borderRadius: '6px',
        color: 'white',
      };
    },
    multiValueLabel: (base) => {
      return {
        ...base,
        background: colors?.brand?.primary[500],
        color: 'white',
      };
    },
    multiValueRemove: (base) => {
      return {
        ...base,
        background: colors?.brand?.primary[500],
        color: 'white',
      };
    },
  };

  return (
    <>
      <Select className="multi-select" options={options} {...others} styles={styles} />
    </>
  );
};
