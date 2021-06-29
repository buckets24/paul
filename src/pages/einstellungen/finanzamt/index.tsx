import { Box, Button, Flex, Heading, IconButton, SimpleGrid, Stack, Text, useDisclosure } from '@chakra-ui/react';
import DataTable from 'jexity-app/data-table/DataTable';
import { DataTableActionsRenderProp, DataTableColumn, OnSortByColumn } from 'jexity-app/data-table/dataTableProps';
import GlobalSearchBar from 'jexity-app/data-table/GlobalSearchBar';
import { FieldVariant } from 'jexity-app/form/fields/fieldApi';
import { CheckIcon } from 'jexity-app/icons/CheckIcon';
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
import DeleteTaxOfficeModal from 'src/modules/tax-office/modals/DeleteTaxOfficeModal';
import useTaxOfficeInfiniteQuery, {
  UseTaxOfficeInfiniteQueryInput,
  UseTaxOfficeInfiniteQueryValue,
} from 'src/modules/tax-office/query-hooks/useTaxOfficeInfiniteQuery';
import { DeleteIcon } from 'src/theme/icons/DeleteIcon';
import { EditIcon } from 'src/theme/icons/EditIcon';
import { PlusCircleIcon } from 'src/theme/icons/PlusCircleIcon';
import Spinner from 'src/views/common/Spinner';
import { getEinstellungenLayout } from 'src/views/einstellungen/EinstellungenLayout';

type TaxOfficeRow = NonNullable<UseTaxOfficeInfiniteQueryValue>['taxOffices'][number];

const TaxOfficePage: FC & HasLayout = () => {
  const router = useRouter();
  const deleteModalDisclosure = useDisclosure();

  const [queryFilter, setQueryFilter] = useState<UseTaxOfficeInfiniteQueryInput>({ limit: 100 });
  const { data: taxOffices, isLoading, hasNextPage, fetchNextPage, refetch } = useTaxOfficeInfiniteQuery(queryFilter);

  useEffect(() => {
    void refetch();
  }, [queryFilter, refetch]);

  const onClickName = useCallback((taxOffice: TaxOfficeRow) => {
    void router.push('/einstellungen/finanzamt/[id]', `/einstellungen/finanzamt/${taxOffice.id}`);
  }, []); // eslint-disable-line

  const onClickCell = (cell: Cell<TaxOfficeRow>, row: Row<TaxOfficeRow>) => {
    const { style, ...cellProps } = cell.getCellProps();
    return (
      <Text {...cellProps} sx={{ cursor: 'pointer', ...style }} onClick={() => onClickName(row.original)}>
        {cell.value}
      </Text>
    );
  };

  const columns: DataTableColumn<TaxOfficeRow> = useMemo(
    () => {
      const cols: DataTableColumn<TaxOfficeRow> = [
        {
          Header: 'Finanzamt',
          accessor: 'name',
          Cell: ({ cell, row }: CellProps<TaxOfficeRow>) => {
            return onClickCell(cell, row);
          },
        },
        {
          Header: 'Straße Hausnummer',
          accessor: 'address',
          minWidth: 200,
        },
        {
          Header: 'PLZ',
          accessor: 'postcode',
          maxWidth: 90,
        },
        {
          Header: 'Ort',
          accessor: 'place',
          maxWidth: 90,
        },
        {
          Header: 'Postfach',
          accessor: 'poBox',

          maxWidth: 100,
        },
        {
          Header: 'PLZ Postfac',
          accessor: 'postcodePoBox',

          maxWidth: 150,
        },
        {
          Header: 'Geändert von',
          accessor: 'updatedBy',
        },
        {
          Header: 'Aktualisiert',
          accessor: 'updatedAt',
          Cell: ({ cell }: CellProps<TaxOfficeRow>) => <Text>{formatDateToDe(cell.value)}</Text>,
        },
        {
          Header: 'Aktiv',
          accessor: 'active',
          Cell: ({ cell }: CellProps<TaxOfficeRow>) =>
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
          Cell: ({ cell, row }: CellProps<TaxOfficeRow>) => {
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
                <DeleteTaxOfficeModal disclosure={deleteRowModalDisclosure} taxOffice={row.original.id} />
              </Box>
            );
          },
        },
      ];
      return cols;
    },
    [onClickName] // eslint-disable-line
  );

  const dataTableActions = useCallback<DataTableActionsRenderProp<TaxOfficeRow>>(
    (tableInstance) => {
      const rows = tableInstance.selectedFlatRows;
      let options = { edit: false, delete: false, passwordReset: false };
      if (rows.length === 1) {
        options = { edit: true, delete: true, passwordReset: true };
      }
      if (rows.length > 1) {
        options = { edit: false, delete: true, passwordReset: true };
      }

      return (
        <>
          <DataTableActionItem
            leftIcon={<PlusCircleIcon />}
            onClick={() => {
              void router.push(`/einstellungen/finanzamt/erstellen`);
            }}
          >
            Hinzufügen
          </DataTableActionItem>
          <DataTableActionItem
            leftIcon={<EditIcon />}
            onClick={() => {
              if (rows.length === 1) {
                void router.push(`/einstellungen/finanzamt/${rows[0].original.id}`);
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

          <DeleteTaxOfficeModal
            taxOffice={rows.map((r) => taxOffices?.pages[0]?.taxOffices[Number(r.id)].id)}
            disclosure={deleteModalDisclosure}
          />
        </>
      );
    },
    [deleteModalDisclosure]
  );

  const rows = useMemo<TaxOfficeRow[]>(() => {
    return (
      taxOffices?.pages
        .map((page) => page?.taxOffices)
        .flat()
        .filter(notEmpty)
        .map(({ id, name, address, postcode, place, poBox, postcodePoBox, active, updatedBy, updatedAt }) => ({
          id,
          name,
          address,
          postcode,
          place,
          poBox,
          postcodePoBox,
          active,
          updatedBy,
          updatedAt,
        })) ?? []
    );
  }, [taxOffices?.pages]);

  const onSort = useCallback<OnSortByColumn<TaxOfficeRow>>(
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
              Finanzamt
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

            <NextLink href="/einstellungen/finanzamt/erstellen" passHref>
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
                Finanzamt hinzufügen
              </Button>
            </NextLink>
          </Flex>
        </Stack>
      </DashboardHeading>

      <Box mx={6} mb={6} overflow="hidden">
        {isLoading ? (
          <Spinner />
        ) : (
          <DataTable<TaxOfficeRow>
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
        )}
      </Box>
    </SimpleGrid>
  );
};

TaxOfficePage.getLayout = getEinstellungenLayout;

export default TaxOfficePage;
