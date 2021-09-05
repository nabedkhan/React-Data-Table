import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  Card,
  Checkbox,
  Container,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC, forwardRef, useEffect, useMemo, useRef } from "react";
import { usePagination, useRowSelect, useSortBy, useTable } from "react-table";
import columnShape from "../TableUtils/columnShape";
import fakeData from "../TableUtils/fakeData";
import Heading from "../TableUtils/Heading";

const SelectCheckBox = forwardRef(
  ({ indeterminate, ...rest }: any, ref: any) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      if (resolvedRef) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [resolvedRef, indeterminate]);

    return <Checkbox ref={resolvedRef} {...rest} disableRipple />;
  }
);

const RowSelectTable: FC = () => {
  const columns: any = useMemo(() => columnShape, []);
  const data = useMemo(() => fakeData(), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,

    pageOptions,
    gotoPage,

    // selectedFlatRows,
    state: { selectedRowIds },
  }: any = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }: any) => (
            <SelectCheckBox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }: any) => (
            <SelectCheckBox {...row.getToggleRowSelectedProps()} />
          ),
        },
        ...columns,
      ]);
    }
  );

  const handleChange = (_event: any, currentPageNo: number) => {
    gotoPage(currentPageNo);
  };

  // console.log(headerGroups[0].headers[0]);
  // console.log(selectedRowIds, selectedFlatRows);

  console.log(page[0].id);
  const selectedRow = (selectId: any) => {
    const rowId = Object.keys(selectedRowIds);
    const findId = rowId.find((id) => id === selectId);
    if (findId) {
      return true;
    }
    return false;
  };

  return (
    <Container>
      <Heading title="React Table - Row Select Feature" />
      <Card sx={{ mb: "1rem", padding: "1rem" }}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup: any) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {column.render("Header")}

                      {column.isSorted &&
                        (column.isSortedDesc ? (
                          <KeyboardArrowDown color="primary" fontSize="small" />
                        ) : (
                          <KeyboardArrowUp color="primary" fontSize="small" />
                        ))}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  sx={
                    selectedRow(row.id)
                      ? {
                          backgroundColor: "#E6EEFF",
                          position: "relative",
                          "&::after": {
                            content: '""',
                            height: "100%",
                            width: "3px",
                            position: "absolute",
                            backgroundColor: "#61A9FF",
                            top: 0,
                            left: 0,
                          },
                        }
                      : {}
                  }
                >
                  {row.cells.map((cell: any) => (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <Stack alignItems="center" marginTop="2rem">
          <Pagination
            count={pageOptions.length}
            shape="rounded"
            onChange={handleChange}
          />
        </Stack>
      </Card>
    </Container>
  );
};

export default RowSelectTable;
