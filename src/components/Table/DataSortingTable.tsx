import {
  KeyboardArrowDown,
  KeyboardArrowRight,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  Box,
  Card,
  Container,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC, useMemo } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import columnShape from "../TableUtils/columnShape";
import fakeData from "../TableUtils/fakeData";
import Heading from "../TableUtils/Heading";

const DataSortingTable: FC = () => {
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
  }: any = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  );

  const handleChange = (_event: any, currentPageNo: number) => {
    gotoPage(currentPageNo);
  };

  return (
    <Container>
      <Heading title="React Table - Data Sorting Feature" />
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

                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <KeyboardArrowDown color="primary" fontSize="small" />
                        ) : (
                          <KeyboardArrowUp color="primary" fontSize="small" />
                        )
                      ) : (
                        <KeyboardArrowRight color="primary" fontSize="small" />
                      )}
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
                <TableRow {...row.getRowProps()}>
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

export default DataSortingTable;
