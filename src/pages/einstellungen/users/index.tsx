import { EditIcon } from '@chakra-ui/icons';
import { SimpleGrid } from '@chakra-ui/layout';
import { Box, Button, Flex, Heading, IconButton, Text, useDisclosure } from '@chakra-ui/react';
import DataTable from 'jexity-app/data-table/DataTable';
import { DataTableActionsRenderProp, DataTableColumn, OnSortByColumn } from 'jexity-app/data-table/dataTableProps';
import GlobalSearchBar from 'jexity-app/data-table/GlobalSearchBar';
import { FieldVariant } from 'jexity-app/form/fields/fieldApi';
import { SearchIcon } from 'jexity-app/icons/SearchIcon';
import { UserAddIcon } from 'jexity-app/icons/UserAddIcon';
import DashboardHeading from 'jexity-app/layout/DashboardHeading';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import notEmpty from 'jexity-app/utils/filterEmpty';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Cell, CellProps, Row } from 'react-table';
import DataTableActionItem from 'src/components/datatable/DataTableActionItem';
import PasswordModal from 'src/modules/user/modal/PasswordModal';
import UserDeleteModal from 'src/modules/user/modal/UserDeleteModal';
import useUsersInfiniteQuery, {
  UseUsersInfiniteQueryInput,
  UseUsersInfiniteQueryValue,
} from 'src/modules/user/query-hooks/useUsersInfiniteQuery';
import { DeleteIcon } from 'src/theme/icons/DeleteIcon';
import { PlusCircleIcon } from 'src/theme/icons/PlusCircleIcon';
import { capitalize } from 'src/utils/capitalize';
import Spinner from 'src/views/common/Spinner';
import { getEinstellungenLayout } from 'src/views/einstellungen/EinstellungenLayout';

type UserRow = NonNullable<UseUsersInfiniteQueryValue>['users'][number];

const UsersPage: FC & HasLayout = () => {
  const router = useRouter();

  const deleteModalDisclosure = useDisclosure();
  const passwordModalDisclosure = useDisclosure();

  const [queryFilter, setQueryFilter] = useState<UseUsersInfiniteQueryInput>({ limit: 100 });
  const { data: users, isLoading, hasNextPage, fetchNextPage, refetch } = useUsersInfiniteQuery(queryFilter);

  useEffect(() => {
    void refetch();
  }, [queryFilter, refetch]);

  const onClickName = useCallback((user: UserRow) => {
    void router.push('/einstellungen/users/[id]', `/einstellungen/users/${user.id}`);
  }, []); // eslint-disable-line

  const onClickCell = (cell: Cell<UserRow>, row: Row<UserRow>) => {
    const { style, ...cellProps } = cell.getCellProps();
    return (
      <Text {...cellProps} sx={{ cursor: 'pointer', ...style }} onClick={() => onClickName(row.original)}>
        {cell.value}
      </Text>
    );
  };

  const columns: DataTableColumn<UserRow> = useMemo(
    () => {
      const cols: DataTableColumn<UserRow> = [
        {
          Header: 'Anrede',
          accessor: 'salutation',
          Cell: ({ cell }: CellProps<UserRow>) => <Text>{capitalize(cell.value)}</Text>,
        },
        {
          Header: 'Vorname',
          accessor: 'firstName',
          Cell: ({ cell, row }: CellProps<UserRow>) => {
            return onClickCell(cell, row);
          },
        },
        {
          Header: 'Name',
          accessor: 'lastName',
          Cell: ({ cell, row }: CellProps<UserRow>) => {
            return onClickCell(cell, row);
          },
        },
        {
          Header: 'Firma',
          accessor: 'company',
          minWidth: 200,
        },
        {
          Header: 'E-mail',
          accessor: 'email',
          minWidth: 200,
        },
        {
          Header: 'Position',
          accessor: 'position',
          minWidth: 200,
        },
        {
          Header: 'action',
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          Cell: ({ cell, row }: CellProps<UserRow>) => {
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
                <UserDeleteModal user={row.original} disclosure={deleteRowModalDisclosure} />
              </Box>
            );
          },
        },
      ];
      return cols;
    },
    [onClickName] // eslint-disable-line
  );

  // This is a render prop
  const dataTableActions = useCallback<DataTableActionsRenderProp<UserRow>>(
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
              void router.push(`/einstellungen/users/create`);
            }}
          >
            Hinzufügen
          </DataTableActionItem>
          <DataTableActionItem
            leftIcon={<EditIcon />}
            onClick={() => {
              if (rows.length === 1) {
                void router.push(`/einstellungen/users/${rows[0].original.id}`);
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
          <DataTableActionItem
            leftIcon={<DeleteIcon />}
            onClick={(e) => {
              e.preventDefault();
              passwordModalDisclosure.onOpen();
              return;
            }}
            isDisabled={!options.passwordReset}
          >
            Passwort zurücksetzten
          </DataTableActionItem>

          <UserDeleteModal
            user={rows.length === 1 ? rows[0].original : undefined}
            multipleUsers={rows.map((r) => r.original)}
            disclosure={deleteModalDisclosure}
          />
          {rows.length === 1 && rows[0].original.id && (
            <PasswordModal userId={rows[0].original.id} disclosure={passwordModalDisclosure} />
          )}
        </>
      );
    },
    [deleteModalDisclosure]
  );

  const rows = useMemo<UserRow[]>(() => {
    return (
      users?.pages
        .map((page) => page?.users)
        .flat()
        .filter(notEmpty)
        .map(({ id, salutation, firstName, lastName, company, email, position }) => ({
          id,
          salutation,
          firstName,
          lastName,
          company,
          email,
          position,
        })) ?? []
    );
  }, [users?.pages]);

  const onSort = useCallback<OnSortByColumn<UserRow>>(
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
        <Flex flexDir={['column', null, 'row']} justifyContent="space-between" alignItems="center">
          <Heading as="h1" fontSize={['xl', null, null, '4xl']} color="gray.900">
            Benutzerverwaltung
          </Heading>
        </Flex>
        <Flex flexDir={['column', null, 'row']} justify="flex-end" mt={[5, null, 0]}>
          <Box>
            <GlobalSearchBar
              defaultSuggestions={[]} // Required to pass even if it's empty
              size="md"
              fontSize="md"
              variant={FieldVariant.OUTLINE}
              placeholder="Suche"
              leftIcon={<SearchIcon color="gray.600" />}
              onChange={(searchValue) => setQueryFilter({ ...queryFilter, q: searchValue })}
            />
          </Box>
          <Box d={['none', null, 'block']} w="1px" bgColor="gray.400" mx={6} />
          <NextLink href="/einstellungen/users/create" passHref>
            <Button
              as="a"
              mt={[5, null, 0]}
              padding="10px 24px 10px 24px"
              size="md"
              bg="brand.primary.600"
              borderRadius={4}
              color="white"
              fontSize="md"
              leftIcon={<UserAddIcon />}
              _hover={{
                bg: 'brand.primary.700',
              }}
            >
              Benutzer hinzufügen
            </Button>
          </NextLink>
        </Flex>
      </DashboardHeading>
      <Box mx={6} mb={6} overflow="hidden">
        {isLoading ? (
          <Spinner />
        ) : (
          <DataTable<UserRow>
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

UsersPage.getLayout = getEinstellungenLayout;

export default UsersPage;
