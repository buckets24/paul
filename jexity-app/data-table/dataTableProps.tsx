import { BoxProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
import {
  Column,
  Row,
  TableInstance,
  TableState,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersOptions,
  UseGlobalFiltersState,
  UseRowSelectInstanceProps,
  UseRowSelectOptions,
  UseRowSelectRowProps,
  UseRowSelectState,
  UseSortByColumnOptions,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
  UseTableOptions,
} from 'react-table';

export const CHECKBOX_COLUMN_ID = 'CHECKBOX_COLUMN_ID';

/**
 * Props for the data table component
 */
export type OnSelectRows = (rows: string[]) => void;
export type OnDeleteRows = (rows: string[]) => void;
export type OnSortByColumn<D extends Record<string, unknown>> = (sortBy: UseSortByState<D>['sortBy']) => void;
export type DataTableActionsRenderProp<D extends Record<string, unknown>> = (
  tableInstance: DataTableInstance<D>
) => ReactNode;
export interface DataTableProps<D extends Record<string, unknown>> extends DataTableInfiniteLoader {
  actions?: ReactNode | DataTableActionsRenderProp<D>;
  hasSelection?: boolean;
  columns: Array<Column<D>>;
  data: Array<D>;
  globalFilter: string;
  containerProps?: BoxProps;
  showFooter?: boolean;

  /**
   * When rows are selected
   */
  onSelectRows?: OnSelectRows;

  /**
   * Delete action was clicked while any number of rows
   * are selected
   */
  onDeleteRows?: OnDeleteRows;

  onSortByColumn?: OnSortByColumn<D>;
}

/**
 * Typings for basic data table
 */
export type DataTableOptions<D extends Record<string, unknown>> = UseTableOptions<D> &
  UseGlobalFiltersOptions<D> &
  UseRowSelectOptions<D> &
  UseSortByColumnOptions<D> &
  UseSortByOptions<D>;
export type DataTableInstance<D extends Record<string, unknown>> = TableInstance<D> &
  UseGlobalFiltersInstanceProps<D> &
  UseRowSelectInstanceProps<D> &
  UseSortByInstanceProps<D>;
export type DataTableState<D extends Record<string, unknown>> = TableState<D> &
  UseGlobalFiltersState<D> &
  UseRowSelectState<D> &
  UseSortByState<D>;
export type DataTableColumn<D extends Record<string, any>> = Array<
  // Footer is not default to react-table types https://github.com/tannerlinsley/react-table/issues/2983
  Column<D> & { Footer?: (tableProps: DataTableInstance<D>) => ReactNode }
>;
export type DataTableRows<D extends Record<string, unknown>> = (Row<D> & UseRowSelectRowProps<D>)[];

export interface DataTableInfiniteLoader {
  /**
   * Copied from react-window-infinite-loader types, it is not exported
   */
  loadMoreItems: (startIndex: number, stopIndex: number) => Promise<any> | null;
}
