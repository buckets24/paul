import { Box, Button, Flex, Grid, Heading, IconButton, SimpleGrid, Stack, Text, useDisclosure } from '@chakra-ui/react';
import DataTable from 'jexity-app/data-table/DataTable';
import { DataTableActionsRenderProp, DataTableColumn, OnSortByColumn } from 'jexity-app/data-table/dataTableProps';
import GlobalSearchBar from 'jexity-app/data-table/GlobalSearchBar';
import { FieldVariant } from 'jexity-app/form/fields/fieldApi';
import { SearchIcon } from 'jexity-app/icons/SearchIcon';
import DashboardHeading from 'jexity-app/layout/DashboardHeading';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import notEmpty from 'jexity-app/utils/filterEmpty';
import formatDateToDe from 'jexity-app/utils/formatDateToDe';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Cell, CellProps, Row } from 'react-table';
import DataTableActionItem from 'src/components/datatable/DataTableActionItem';
import DeleteMaritalStatusModal from 'src/modules/marital-status/modals/DeleteMaritalStatusModal';
import useMaritalStatusInfiniteQuery, {
  UseMaritalStatusInfiniteQueryInput,
  UseMaritalStatusInfiniteQueryValue,
} from 'src/modules/marital-status/query-hooks/useMaritalStatusInfiniteQuery';
import { CheckIcon } from 'src/theme/icons/CheckIcon';
import { DeleteIcon } from 'src/theme/icons/DeleteIcon';
import { EditIcon } from 'src/theme/icons/EditIcon';
import { PlusCircleIcon } from 'src/theme/icons/PlusCircleIcon';
import Spinner from 'src/views/common/Spinner';
import { getEinstellungenLayout } from 'src/views/einstellungen/EinstellungenLayout';

type FamilienstandRow = NonNullable<UseMaritalStatusInfiniteQueryValue>['maritalStatus'][number];

const FamilienstandPage: FC & HasLayout = () => {
  const router = useRouter();

  const deleteModalDisclosure = useDisclosure();

  const [queryFilter, setQueryFilter] = useState<UseMaritalStatusInfiniteQueryInput>({ limit: 100 });
  const { data: maritalStatus, isLoading, hasNextPage, fetchNextPage, refetch } = useMaritalStatusInfiniteQuery(
    queryFilter
  );

  useEffect(() => {
    void refetch();
  }, [queryFilter, refetch]);

  const onClickName = useCallback((maritalStatus: FamilienstandRow) => {
    void router.push('/einstellungen/familienstand/[id]', `/einstellungen/familienstand/${maritalStatus.id}`);
  }, []); // eslint-disable-line

  const onClickCell = (cell: Cell<FamilienstandRow>, row: Row<FamilienstandRow>) => {
    const { style, ...cellProps } = cell.getCellProps();
    return (
      <Text {...cellProps} sx={{ cursor: 'pointer', ...style }} onClick={() => onClickName(row.original)}>
        {cell.value}
      </Text>
    );
  };

  const columns: DataTableColumn<FamilienstandRow> = useMemo(
    () => {
      const cols: DataTableColumn<FamilienstandRow> = [
        {
          Header: 'Familienstand',
          accessor: 'name',
          Cell: ({ cell, row }: CellProps<FamilienstandRow>) => {
            return onClickCell(cell, row);
          },
        },
        {
          Header: 'Geändert von',
          accessor: 'updatedBy',
        },
        {
          Header: 'Aktualisiert',
          accessor: 'updatedAt',
          Cell: ({ cell }: CellProps<FamilienstandRow>) => <Text>{formatDateToDe(cell.value)}</Text>,
          width: 100,
        },
        {
          Header: 'Activ',
          accessor: 'active',
          Cell: ({ cell }: CellProps<FamilienstandRow>) =>
            cell.value && (
              <Box display="flex" justifyContent="center">
                <CheckIcon />
              </Box>
            ),
          width: 50,
        },
        {
          Header: 'action',
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          Cell: ({ cell, row }: CellProps<FamilienstandRow>) => {
            const deleteRowModalDisclosure = useDisclosure();
            return (
              <Box>
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  onClick={() => deleteRowModalDisclosure.onOpen()}
                  bg="none"
                  _hover={{ bg: 'support.alert.500', color: 'white' }}
                />
                <DeleteMaritalStatusModal maritalStatus={row.original.id} disclosure={deleteRowModalDisclosure} />
              </Box>
            );
          },
          width: 40,
        },
      ];
      return cols;
    },
    [onClickName] // eslint-disable-line
  );

  const dataTableActions = useCallback<DataTableActionsRenderProp<FamilienstandRow>>(
    (tableInstance) => {
      const rows = tableInstance.selectedFlatRows;
      let options = { edit: false, delete: false };
      if (rows.length === 1) {
        options = { edit: true, delete: true };
      }
      if (rows.length > 1) {
        options = { edit: false, delete: true };
      }

      const selectedRows = rows.map((r) => maritalStatus?.pages[0]?.maritalStatus[Number(r.id)].id);

      return (
        <>
          <DataTableActionItem
            leftIcon={<PlusCircleIcon />}
            onClick={() => {
              void router.push(`/einstellungen/familienstand/erstellen`);
            }}
          >
            Hinzufügen
          </DataTableActionItem>
          <DataTableActionItem
            leftIcon={<EditIcon />}
            onClick={() => {
              if (rows.length === 1) {
                void router.push(`/einstellungen/familienstand/${rows[0].original.id}`);
              }
            }}
            isDisabled={!options.edit}
          >
            Bearbeiten
          </DataTableActionItem>
          <DataTableActionItem
            leftIcon={<DeleteIcon />}
            onClick={() => deleteModalDisclosure.onOpen()}
            isDisabled={!options.delete}
          >
            Löschen
          </DataTableActionItem>

          <DeleteMaritalStatusModal maritalStatus={selectedRows} disclosure={deleteModalDisclosure} />
        </>
      );
    },
    [deleteModalDisclosure]
  );

  const rows = useMemo<FamilienstandRow[]>(() => {
    return (
      maritalStatus?.pages
        .map((page) => page?.maritalStatus)
        .flat()
        .filter(notEmpty)
        .map(({ id, name, active, updatedAt, updatedBy }) => ({
          id,
          name,
          active,
          updatedAt,
          updatedBy,
        })) ?? []
    );
  }, [maritalStatus?.pages]);

  const onSort = useCallback<OnSortByColumn<FamilienstandRow>>(
    (sortBy) => {
      if (sortBy[0]) {
        const v = sortBy[0];
        setQueryFilter({ ...queryFilter, orderBy: { [v.id]: v.desc ? 'desc' : 'asc' } });
      } else {
        setQueryFilter({ ...queryFilter, orderBy: undefined });
      }
    },
    [setQueryFilter, refetch, queryFilter.q]
  );

  return (
    <SimpleGrid data-item="grid" h="100%" bg="brand.primary.100" gridTemplateRows="min-content 1fr" overflow="hidden">
      <DashboardHeading p={6} pt={8} borderBottomColor="gray.400">
        <Stack direction={['column', null, 'row']} justifyContent="space-between" alignItems="center">
          <Stack direction="column">
            <Text fontSize="md">Listenverwaltung</Text>
            <Heading as="h1" fontSize={['xl', null, null, '4xl']} color="gray.900">
              Familienstand
            </Heading>
          </Stack>
          <Flex flexDir={['column', null, 'row']} justify="flex-end" mt={[5, null, 0]}>
            <GlobalSearchBar
              defaultSuggestions={[]} // Required to pass even if it's empty
              height="40px"
              fontSize="md"
              variant={FieldVariant.OUTLINE}
              placeholder="Suche"
              leftIcon={<SearchIcon color="gray.600" />}
              onChange={(searchValue) => setQueryFilter({ ...queryFilter, q: searchValue })}
            />
            <Box d={['none', null, 'block']} w="1px" bgColor="gray.400" mx={6} />
            <NextLink href="/einstellungen/familienstand/erstellen" passHref>
              <Button
                as="a"
                mt={[5, null, 0]}
                padding="10px 24px 10px 24px"
                size="md"
                bg="brand.primary.600"
                borderRadius={4}
                color="white"
                fontSize="md"
                leftIcon={<PlusCircleIcon />}
                _hover={{
                  bg: 'brand.primary.700',
                }}
              >
                Familienstand hinzufügen
              </Button>
            </NextLink>
          </Flex>
        </Stack>
      </DashboardHeading>
      <Box mx={6} mb={6} overflow="hidden">
        {isLoading ? (
          <Spinner />
        ) : (
          <Grid templateColumns={['1fr', null, null, null, '1fr 1fr']} height="100%">
            <DataTable<FamilienstandRow>
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
            />
          </Grid>
        )}
      </Box>
    </SimpleGrid>
  );
};

FamilienstandPage.getLayout = getEinstellungenLayout;

export default FamilienstandPage;
