import { Box, Flex, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react';
import Card from 'jexity-app/card/Card';
import { TriangleIcon } from 'jexity-app/icons/TriangleIcon';
import MeasuredBox from 'jexity-app/measured-box/MeasuredBox';
import React, { FC, useEffect, useMemo } from 'react';
import {
  FilterType,
  FilterTypes,
  HeaderGroup,
  useBlockLayout,
  useFilters,
  useGlobalFilter,
  useRowSelect,
  useSortBy,
  UseSortByColumnProps,
  UseSortByState,
  useTable,
} from 'react-table';

import DataTableModal from './ActionModals/DataTableModal';
import DataTableBody from './DataTableBody';
import {
  CHECKBOX_COLUMN_ID,
  DataTableInstance,
  DataTableOptions,
  DataTableProps,
  DataTableRows,
  DataTableState,
} from './dataTableProps';

/**
 * When using this table make sure that all props are memoized
 * for best possible performance. Recomputation for this component
 * may get out of hand.
 */

{
  /* <DataTable<UserRow>
  actions={dataTableActions}
  columns={columns}
  data={rows}
  globalFilter=""
  onSortByColumn={onSort}
  loadMoreItems={async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  }}
/>; */
}

function DataTable<D extends Record<string, any>>({
  actions,
  columns,
  data,
  globalFilter,
  hasSelection = true,
  onSelectRows,
  onDeleteRows,
  onSortByColumn,
  loadMoreItems,
  showFooter = false,
}: DataTableProps<D>): ReturnType<FC> {
  const deleteModalDisclosure = useDisclosure();

  const filterTypes: FilterTypes<D> = useMemo<FilterTypes<D>>(() => {
    const filters: { [key: string]: FilterType<D> } = {
      /**
       * We can add any form of filtering options here.
       * I've removed fuzzyText because it performs very slowly.
       * If we need it https://github.com/farzher/fuzzysort we can
       * use this
       */
    };
    return filters;
  }, []);

  const checkSelectionColumns = useMemo(() => {
    const selectionProps = {
      id: CHECKBOX_COLUMN_ID,
      maxWidth: 64,
    };

    if (hasSelection) {
      return [selectionProps, ...columns];
    } else {
      return columns;
    }
  }, [columns, hasSelection]);

  const tableOptions: DataTableOptions<D> = {
    columns: checkSelectionColumns,
    data: data,
    filterTypes,
    manualSortBy: !!onSortByColumn,
  };

  const tableInstance: DataTableInstance<D> = useTable<D>(
    tableOptions,
    useFilters,
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    useRowSelect,
    useBlockLayout
  ) as DataTableInstance<D>;

  const { setGlobalFilter, headerGroups, getTableProps, footerGroups } = tableInstance;
  const tableState = tableInstance.state as DataTableState<D>;
  const rows = tableInstance.rows as DataTableRows<D>;

  useEffect(() => {
    setGlobalFilter(globalFilter);
  }, [globalFilter, setGlobalFilter]);

  useEffect(() => {
    if (onSelectRows) {
      onSelectRows(Object.keys(tableState.selectedRowIds));
    }
  }, [tableState.selectedRowIds, onSelectRows]);

  useEffect(() => {
    const s = tableInstance.state as UseSortByState<D>;
    onSortByColumn?.(s['sortBy']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(tableInstance.state as UseSortByState<D>).sortBy, onSortByColumn]);

  return (
    <>
      <SimpleGrid h="100%" overflow="hidden">
        <Flex data-name="data-table-actions" justify="flex-end" py={4}>
          {typeof actions === 'function' ? actions(tableInstance) : actions}
        </Flex>
        <Card data-name="data-table" h="100%" overflow="auto">
          <SimpleGrid
            {...getTableProps()}
            h="100%"
            w="100%"
            gridTemplateRows="min-content 1fr min-content"
            overflow="auto"
          >
            <Box>
              {headerGroups.map((headerGroup) => {
                const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
                const { style, ...otherHeaderProps } = headerGroupProps;
                return (
                  <Box
                    key={key}
                    {...otherHeaderProps}
                    d="flex"
                    w="100%"
                    h="64px"
                    borderBottom="2px solid"
                    borderColor="gray.500"
                  >
                    {headerGroup.headers.map((c) => {
                      const column = c as HeaderGroup<D> & UseSortByColumnProps<D>;
                      const { key, ...columnHeaderProps } = column.getHeaderProps(column.getSortByToggleProps());

                      const sortIconDirection = column.isSorted ? `black` : `gray.300`;

                      const cell =
                        column.id === CHECKBOX_COLUMN_ID ? (
                          <Flex d="flex" alignItems="center" justifyContent="center" h="100%"></Flex>
                        ) : (
                          column.Header !== 'action' && (
                            <Text
                              textTransform="uppercase"
                              letterSpacing="1px"
                              fontSize="xs"
                              fontWeight="bold"
                              lineHeight="64px"
                              d="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              userSelect="none"
                            >
                              <span>{column.render('Header')}</span>
                              <TriangleIcon
                                color={sortIconDirection}
                                transition="0.2s"
                                transform={`rotate(${column.isSorted && column.isSortedDesc ? 180 : 0}deg)`}
                              />
                            </Text>
                          )
                        );

                      return (
                        <Flex key={key} {...columnHeaderProps} mx={4}>
                          {cell}
                        </Flex>
                      );
                    })}
                  </Box>
                );
              })}
            </Box>
            <Box overflow="hidden">
              <MeasuredBox>
                <DataTableBody rows={rows} tableInstance={tableInstance} loadMoreItems={loadMoreItems} />
              </MeasuredBox>
            </Box>
            <Box>
              {showFooter &&
                footerGroups.map((footerGroup) => {
                  const { key, ...footerGroupProps } = footerGroup.getFooterGroupProps();
                  const { style, ...otherFooterGroupProps } = footerGroupProps;
                  return (
                    <Box key={key} {...otherFooterGroupProps} h="64px" d={style?.display} bgColor="gray.100">
                      {footerGroup.headers.map((column) => {
                        const { key, ...otherFooterProps } = column.getFooterProps();
                        return (
                          <Box key={key} {...otherFooterProps} mx="4">
                            <Flex alignItems="center" h="100%">
                              {column.render('Footer')}
                            </Flex>
                          </Box>
                        );
                      })}
                    </Box>
                  );
                })}
            </Box>
          </SimpleGrid>
        </Card>
        <DataTableModal
          {...deleteModalDisclosure}
          header="Delete user/s"
          body={`Delete users: ${Object.keys(tableState.selectedRowIds).join(', ')}`}
          confirmText="Delete"
          onConfirm={() => {
            if (onDeleteRows) {
              onDeleteRows(Object.keys(tableState.selectedRowIds));
            }
          }}
        />
      </SimpleGrid>
    </>
  );
}

export default DataTable;
