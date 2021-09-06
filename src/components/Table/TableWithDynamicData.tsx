import { ViewComfy, ViewList } from "@mui/icons-material";
import {
  alpha,
  Box,
  Card,
  Checkbox,
  Container,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC, forwardRef, useEffect, useMemo, useRef, useState } from "react";
import {
  useAsyncDebounce,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useTable,
} from "react-table";
import {
  StyledPagination,
  StyledSearchIcon,
  StyledSearchInput,
} from "../styledComponents";
import columnShape2 from "../TableUtils/columnShape2";
import fakeData2 from "../TableUtils/fakeData2";
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

function SearchFilter({ globalFilter, setGlobalFilter }: any) {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <StyledSearchInput
      placeholder="Search..."
      startAdornment={<StyledSearchIcon />}
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
}

const TableWithDynamicData: FC = () => {
  const columns: any = useMemo(() => columnShape2, []);
  const data: any = useMemo(() => fakeData2, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,

    pageOptions,
    gotoPage,

    state,
    setGlobalFilter,
  }: any = useTable(
    {
      columns,
      data,
    },
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
  // handle pagination
  const handleChange = (_event: any, currentPageNo: number) => {
    gotoPage(currentPageNo - 1);
  };

  return (
    <Container>
      <Heading title="React Table - Stylish Version 1" />
      <Card
        sx={{
          mb: "1rem",
          padding: "1rem",
          backgroundColor: alpha("#fff", 0.5),
        }}
      >
        <Box
          sx={{
            py: "2rem",
            px: "1.5rem",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box flexGrow={1}>
            <SearchFilter
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </Box>
          <Box flexGrow={1} />
          <Box bgcolor="white" borderRadius="4px" height={40}>
            <IconButton component="span" disableRipple disableFocusRipple>
              <ViewList fontSize="small" sx={{ color: "text.disabled" }} />
            </IconButton>
            <IconButton component="span" disableRipple>
              <ViewComfy fontSize="small" sx={{ color: "text.disabled" }} />
            </IconButton>
          </Box>
        </Box>

        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup: any) => (
              <TableRow
                {...headerGroup.getHeaderGroupProps()}
                sx={{ backgroundColor: alpha("#E5F3FD", 0.5) }}
              >
                {headerGroup.headers.map((column: any) => (
                  <TableCell
                    {...column.getHeaderProps()}
                    sx={{ fontSize: 12, fontWeight: 600 }}
                  >
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell: any) => (
                    <TableCell
                      {...cell.getCellProps()}
                      sx={{
                        borderBottom: "1px solid #E3F0FF",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <Stack alignItems="center" marginY="2rem">
          <StyledPagination
            count={pageOptions.length}
            shape="rounded"
            onChange={handleChange}
          />
        </Stack>
      </Card>
    </Container>
  );
};

export default TableWithDynamicData;
