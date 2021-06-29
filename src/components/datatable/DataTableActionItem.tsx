import JexityDataTableActionItem, {
  DataTableActionItemProps as JexityDataTableActionItemProps,
} from 'jexity-app/data-table/DataTableActionItem';
import { FC } from 'react';

/**
 * Basically the Jexity action item but provides the color used by PAUL design.
 * Should probably be done in the theme file.
 */

const DataTableActionItem: FC<Omit<JexityDataTableActionItemProps, 'activeColor' | 'disabledColor'>> = (props) => {
  return <JexityDataTableActionItem activeColor="brand.primary.600" disabledColor="gray.600" {...props} />;
};

export default DataTableActionItem;
