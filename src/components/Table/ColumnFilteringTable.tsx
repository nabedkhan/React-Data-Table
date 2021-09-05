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
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useTable,
} from "react-table";
import columnShape from "../TableUtils/columnShape";
import fakeData from "../TableUtils/fakeData";
import Heading from "../TableUtils/Heading";

// selected row Checkbox
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

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}: any) {
  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder="Search..."
      style={{
        border: "none",
        width: 120,
        padding: 7,
        borderRadius: 8,
        outline: "none",
      }}
    />
  );
}

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: any) {
  const options = useMemo(() => {
    const options: any = new Set();
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id]);
    });

    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      style={{
        border: "none",
        width: 120,
        padding: 7,
        borderRadius: 8,
        outline: "none",
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

// root component
const ColumnFilteringTable: FC = () => {
  const columns: any = useMemo(() => columnShape, []);
  const data = useMemo(() => fakeData(), []);

  const defaultColumn: any = useMemo(
    () => ({ Filter: DefaultColumnFilter }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,

    pageOptions,
    gotoPage,

    state: { selectedRowIds },
  }: any = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
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
      <Heading title="React Table - Column Filtering Feature" />
      <Card sx={{ mb: "1rem", padding: "1rem" }}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup: any) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <TableCell {...column.getHeaderProps()}>
                    <Box>
                      {column.render("Header")}

                      {column.canFilter ? column.render("Filter") : null}
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

export default ColumnFilteringTable;
