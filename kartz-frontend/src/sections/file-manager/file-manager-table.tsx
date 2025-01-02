import type { BoxProps } from '@mui/material/Box';
import type { TableProps } from 'src/components/table';
import type { IFile } from 'src/types/file';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { tablePaginationClasses } from '@mui/material/TablePagination';
import Tooltip from '@mui/material/Tooltip';

import { Iconify } from 'src/components/iconify';
import {
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
} from 'src/components/table';

import { FileManagerTableRow } from './file-manager-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'size', label: 'Size', width: 180 },
  { id: 'type', label: 'Type', width: 180 },
  { id: 'modifiedAt', label: 'Modified', width: 180 },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

type Props = BoxProps & {
  table: TableProps;
  notFound: boolean;
  dataFiltered: IFile[];
  onOpenConfirm: () => void;
  onDeleteRow: (id: string) => void;
};

export function FileManagerTable({
  sx,
  table,
  notFound,
  onDeleteRow,
  dataFiltered,
  onOpenConfirm,
  ...other
}: Props) {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    //
    selected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = table;

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          m: (theme) => ({ md: theme.spacing(-2, -3, 0, -3) }),
          ...sx,
        }}
        {...other}
      >
        <TableSelectedAction
          dense={dense}
          numSelected={selected?.length}
          rowCount={dataFiltered?.length}
          onSelectAllRows={(checked) =>
            onSelectAllRows(
              checked,
              dataFiltered?.map((row) => row.id!)
            )
          }
          action={
            <>
              {/* <Tooltip title="Share">
                <IconButton color="primary">
                  <Iconify icon="solar:share-bold" />
                </IconButton>
              </Tooltip> */}

              <Tooltip title="Delete">
                <IconButton color="primary" onClick={onOpenConfirm}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            </>
          }
          sx={{
            pl: 1,
            pr: 2,
            top: 16,
            left: 24,
            right: 24,
            width: 'auto',
            borderRadius: 1.5,
          }}
        />

        <TableContainer sx={{ px: { md: 3 } }}>
          <Table
            size={dense ? 'small' : 'medium'}
            sx={{ minWidth: 960, borderCollapse: 'separate', borderSpacing: '0 16px' }}
          >
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={dataFiltered?.length}
              numSelected={selected?.length}
              onSort={onSort}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  dataFiltered?.map((row) => row.id!)
                )
              }
              sx={{
                [`& .${tableCellClasses.head}`]: {
                  '&:first-of-type': { borderTopLeftRadius: 12, borderBottomLeftRadius: 12 },
                  '&:last-of-type': { borderTopRightRadius: 12, borderBottomRightRadius: 12 },
                },
              }}
            />

            <TableBody>
              {dataFiltered
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row) => (
                  <FileManagerTableRow
                    key={row?.id}
                    row={row}
                    selected={selected.includes(row?.id!)}
                    onSelectRow={() => onSelectRow(row?.id!)}
                    onDeleteRow={() => onDeleteRow(row?.id!)}
                  />
                ))}

              <TableNoData
                notFound={notFound}
                sx={{
                  m: -2,
                  borderRadius: 1.5,
                  border: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
                }}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <TablePaginationCustom
        page={page}
        dense={dense}
        rowsPerPage={rowsPerPage}
        count={dataFiltered?.length}
        onPageChange={onChangePage}
        onChangeDense={onChangeDense}
        onRowsPerPageChange={onChangeRowsPerPage}
        sx={{ [`& .${tablePaginationClasses.toolbar}`]: { borderTopColor: 'transparent' } }}
      />
    </>
  );
}